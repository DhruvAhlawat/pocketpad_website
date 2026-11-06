# Quick Start: Google Drive Backup

## One-Time Setup (First Time Only)

### 1. Get OAuth Credentials
1. Go to https://console.cloud.google.com/
2. Create a new project called "PocketPad Backup"
3. Enable Google Drive API (APIs & Services > Library > search "Google Drive API")
4. Create Desktop OAuth 2.0 credentials (APIs & Services > Credentials > Create Credentials)
5. Download the JSON file and save it as `credentials.json` in this project directory

### 2. Run the Backup
PowerShell:
```powershell
python .\backup_to_gdrive.py
```

A browser will open. Log in with `dasoft573@gmail.com` and click "Allow".

That's it! The script saves a token so you won't need to log in again.

## Running Backups Later

Just run:
```powershell
python .\backup_to_gdrive.py
```

Or use the convenience script:
```powershell
.\run_backup.ps1
```

## What Gets Backed Up

Files uploaded to `keys/apps/pocketpad/` on Google Drive:
- `android/app/upload-keystore.jks` (CRITICAL)
- `android/key.properties` (CRITICAL)
- `android/app/google-services.json`
- `android/gradle.properties`
- `pubspec.yaml`

Folder structure is preserved, so you'll know exactly where each file goes when restoring.

## Notes

- First run requires browser authentication
- Subsequent runs use saved token (no login needed)
- Files are updated if they already exist in Google Drive
- Missing files are skipped with a message
- Google Drive should remain private/not shared

## For Full Setup Details
See: `GDRIVE_BACKUP_SETUP.md`

## Troubleshooting
- `credentials.json not found?` - Download from Google Cloud Console
- `Token refresh failed?` - Delete `token.json` and run again
