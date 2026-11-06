# Google Drive Backup Setup Guide

This guide will help you set up Google Drive API authentication and run the backup script.

## Step 1: Install Required Python Libraries

Run this command in PowerShell:

```powershell
pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

Or if you prefer (alternative):
```powershell
pip install --upgrade google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

## Step 2: Create Google Cloud Project and Get Credentials

### 2a. Create a Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "PocketPad Backup")
5. Click "CREATE"

### 2b. Enable Google Drive API
1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and click "ENABLE"

### 2c. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" for user type
   - Fill in the app name: "PocketPad Backup"
   - Add your email (dasoft573@gmail.com) as a test user
   - Complete the setup
4. After OAuth consent screen setup, create credentials again:
   - Choose "Desktop application" as application type
   - Name it "PocketPad Backup"
   - Click "CREATE"
5. Click the download button (down arrow icon) on the created credential
6. Save the JSON file as **credentials.json** in the project root directory

Your project root should now contain:
```
gamepad/
  credentials.json  <-- Place it here
  backup_to_gdrive.py
  GDRIVE_BACKUP_SETUP.md
  ...
```

## Step 3: Run the Backup Script

Navigate to the project root in PowerShell and run:

```powershell
python backup_to_gdrive.py
```

### First Run
On the first run:
1. A browser window will open automatically
2. Log in with: **dasoft573@gmail.com**
3. Click "Allow" to grant the app permission to access your Google Drive
4. You'll see a confirmation page - you can close it
5. The script will complete and save your authentication token as `token.json`

### Subsequent Runs
Just run the same command:
```powershell
python backup_to_gdrive.py
```

It will use the saved token and won't require re-authentication (unless the token expires).

## What Gets Backed Up

The script uploads these files to `keys/apps/pocketpad/`:
- game_controller/android/app/upload-keystore.jks
- game_controller/android/key.properties
- game_controller/android/app/google-services.json
- game_controller/pubspec.yaml
- game_controller/android/gradle.properties

The folder structure is preserved, so you'll see in Google Drive:
```
keys/
  apps/
    pocketpad/
      android/
        app/
          upload-keystore.jks
          google-services.json
        gradle.properties
      pubspec.yaml
```

## Files Created by the Script

After first run, you'll have:
- `credentials.json` - OAuth client credentials (from Google Cloud Console)
- `token.json` - Refresh token (auto-generated after first auth)
- `backup_to_gdrive.py` - The backup script

## Troubleshooting

### "credentials.json not found"
- Make sure you downloaded it from Google Cloud Console
- Place it in the project root directory (where backup_to_gdrive.py is)
- Restart the script

### "Token refresh failed"
- Delete `token.json` from the project root
- Run the script again to re-authenticate

### Permission Errors
- Make sure dasoft573@gmail.com is added as a test user in the OAuth consent screen
- Re-download credentials.json and try again

### Script runs but no files appear
- Check your Google Drive at drive.google.com
- Look for the `keys` folder in "My Drive"
- Make sure the files exist in the project (script will skip missing files)

## Security Notes

- `credentials.json` and `token.json` are sensitive files. Don't commit them to git.
- Both files are already in `.gitignore` (if not, add them)
- Keep them secure and don't share them
- Google Drive itself should not be shared (as you mentioned)

## Running Again Later

To run the backup again (after adding new files or updating existing ones):
```powershell
python backup_to_gdrive.py
```

It will update any existing files and add new ones.
