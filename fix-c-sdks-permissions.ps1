# Run this script in PowerShell AS ADMINISTRATOR (right-click -> Run as administrator)
# Fixes git clone / flutter upgrade failures under C:\SDKs

$ErrorActionPreference = 'Stop'
$sdks = 'C:\SDKs'

Write-Host "Fixing permissions on $sdks ..." -ForegroundColor Cyan

# Take ownership of everything under C:\SDKs
takeown /f $sdks /r /d y | Out-Null

# Reset ACLs: only you, SYSTEM, and Administrators — no broad Users/Authenticated Users
icacls $sdks /inheritance:r
icacls $sdks /grant:r `
    "$env:USERDOMAIN\$env:USERNAME:(OI)(CI)F" `
    'NT AUTHORITY\SYSTEM:(OI)(CI)F' `
    'BUILTIN\Administrators:(OI)(CI)F'
icacls $sdks /T /C

Write-Host ""
Write-Host "Testing git init in $sdks\_perm_test ..." -ForegroundColor Cyan
$testDir = Join-Path $sdks '_perm_test'
New-Item -ItemType Directory -Path $testDir -Force | Out-Null
Push-Location $testDir
git init perm-check 2>&1
Pop-Location

Write-Host ""
Write-Host "Testing flutter upgrade ..." -ForegroundColor Cyan
Push-Location (Join-Path $sdks 'flutter')
flutter upgrade
flutter --version
Pop-Location

Write-Host ""
Write-Host "Done. You can delete $testDir if the test passed." -ForegroundColor Green
