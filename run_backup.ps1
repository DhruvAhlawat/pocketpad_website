# Simple script to run Google Drive backup
Write-Host "Google Drive Backup for PocketPad Keys" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if credentials.json exists
if (-not (Test-Path "credentials.json")) {
    Write-Host "ERROR: credentials.json not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow the setup guide:" -ForegroundColor Yellow
    Write-Host "  1. Open GDRIVE_BACKUP_SETUP.md"
    Write-Host "  2. Complete Step 2 to create Google Cloud credentials"
    Write-Host "  3. Save credentials.json to this directory"
    Write-Host ""
    exit 1
}

Write-Host "Starting backup to Google Drive..." -ForegroundColor Green
Write-Host "Target: keys/apps/pocketpad/" -ForegroundColor Green
Write-Host ""

python backup_to_gdrive.py

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "Backup completed successfully!" -ForegroundColor Green
    Write-Host "Check your Google Drive at: https://drive.google.com" -ForegroundColor Green
} else {
    Write-Host "Backup failed with errors!" -ForegroundColor Red
}
