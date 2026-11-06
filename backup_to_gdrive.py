#!/usr/bin/env python3
"""
Google Drive backup script for critical app signing files.
Uploads PocketPad keys and config to: keys/apps/pocketpad
"""

import os
import sys
from pathlib import Path
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from google.oauth2.credentials import Credentials as OAuth2Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.exceptions import RefreshError
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Files to backup (relative to project root)
FILES_TO_BACKUP = [
    "game_controller/android/app/upload-keystore.jks",
    "game_controller/android/key.properties",
    "game_controller/android/app/google-services.json",
    "game_controller/pubspec.yaml",
    "game_controller/android/gradle.properties",
]

# Google Drive folder path
GDRIVE_FOLDER_PATH = "keys/apps/pocketpad"

# Scopes required for Google Drive API
SCOPES = ["https://www.googleapis.com/auth/drive"]

# Token file (stores refresh token after first auth)
TOKEN_FILE = "token.json"
CREDENTIALS_FILE = "credentials.json"


def get_drive_service():
    """Authenticate and return Google Drive service."""
    creds = None

    # Load existing token if available
    if os.path.exists(TOKEN_FILE):
        creds = OAuth2Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    # If no valid token, do OAuth2 flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except RefreshError:
                print("Token refresh failed. Please delete token.json and re-authenticate.")
                sys.exit(1)
        else:
            if not os.path.exists(CREDENTIALS_FILE):
                print(
                    f"ERROR: {CREDENTIALS_FILE} not found!"
                )
                print("\nSetup instructions:")
                print("1. Go to https://console.cloud.google.com/")
                print("2. Create a new project or select existing one")
                print("3. Enable Google Drive API")
                print("4. Create OAuth 2.0 Desktop Client ID credential")
                print("5. Download as JSON and save as credentials.json in this directory")
                sys.exit(1)

            flow = InstalledAppFlow.from_client_secrets_file(
                CREDENTIALS_FILE, SCOPES
            )
            creds = flow.run_local_server(port=0)

        # Save token for future runs
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    return build("drive", "v3", credentials=creds)


def get_or_create_folder(service, folder_path, parent_id=None):
    """Get or create folder path in Google Drive."""
    parts = folder_path.strip("/").split("/")
    current_parent = parent_id or "root"

    for part in parts:
        # Check if folder exists
        query = f"name='{part}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
        if current_parent != "root":
            query += f" and '{current_parent}' in parents"
        else:
            query += " and 'root' in parents"

        results = (
            service.files()
            .list(q=query, spaces="drive", fields="files(id, name)", pageSize=1)
            .execute()
        )
        files = results.get("files", [])

        if files:
            current_parent = files[0]["id"]
        else:
            # Create folder
            file_metadata = {
                "name": part,
                "mimeType": "application/vnd.google-apps.folder",
                "parents": [current_parent],
            }
            folder = service.files().create(body=file_metadata, fields="id").execute()
            current_parent = folder["id"]
            print(f"  Created: {part}/")

    return current_parent


def upload_file(service, file_path, file_rel_path, parent_id):
    """Upload file to Google Drive, preserving folder structure."""
    # Get the path from game_controller onwards
    # e.g., "game_controller/android/app/upload-keystore.jks" -> "android/app/upload-keystore.jks"
    path_parts = file_rel_path.split("/")[1:]  # Skip "game_controller"
    file_name = path_parts[-1]
    folder_parts = path_parts[:-1]

    # Create/navigate to subfolder structure
    current_parent = parent_id
    for folder_name in folder_parts:
        query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and trashed=false and '{current_parent}' in parents"
        results = (
            service.files()
            .list(q=query, spaces="drive", fields="files(id)", pageSize=1)
            .execute()
        )
        existing_folders = results.get("files", [])

        if existing_folders:
            current_parent = existing_folders[0]["id"]
        else:
            # Create subfolder
            file_metadata = {
                "name": folder_name,
                "mimeType": "application/vnd.google-apps.folder",
                "parents": [current_parent],
            }
            folder = service.files().create(body=file_metadata, fields="id").execute()
            current_parent = folder["id"]
            print(f"  Created: {'/'.join(path_parts[: path_parts.index(folder_name) + 1])}/")

    # Check if file already exists
    query = f"name='{file_name}' and trashed=false and '{current_parent}' in parents"
    results = (
        service.files()
        .list(q=query, spaces="drive", fields="files(id)", pageSize=1)
        .execute()
    )
    existing_files = results.get("files", [])

    file_metadata = {"name": file_name}
    media = MediaFileUpload(file_path, resumable=True)

    if existing_files:
        # Update existing file
        file_id = existing_files[0]["id"]
        service.files().update(fileId=file_id, media_body=media).execute()
        print(f"  Updated: {'/'.join(path_parts)}")
    else:
        # Create new file
        file_metadata["parents"] = [current_parent]
        service.files().create(body=file_metadata, media_body=media, fields="id").execute()
        print(f"  Uploaded: {'/'.join(path_parts)}")


def main():
    """Main backup function."""
    print("Starting Google Drive backup...")
    print(f"Target folder: {GDRIVE_FOLDER_PATH}")
    print()

    # Find project root
    project_root = Path(__file__).parent

    # Authenticate
    print("Authenticating with Google Drive...")
    service = get_drive_service()
    print("Authentication successful!")
    print()

    # Create folder structure
    print(f"Getting or creating folder: {GDRIVE_FOLDER_PATH}")
    folder_id = get_or_create_folder(service, GDRIVE_FOLDER_PATH)
    print(f"Target folder ID: {folder_id}")
    print()

    # Upload files
    print("Uploading files...")
    failed_files = []

    for file_rel_path in FILES_TO_BACKUP:
        file_path = project_root / file_rel_path
        if file_path.exists():
            try:
                upload_file(service, str(file_path), file_rel_path, folder_id)
            except Exception as e:
                print(f"  ERROR uploading {file_rel_path}: {e}")
                failed_files.append(file_rel_path)
        else:
            print(f"  SKIPPED (not found): {file_rel_path}")

    print()
    print("Backup complete!")
    if failed_files:
        print(f"Failed files: {failed_files}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
