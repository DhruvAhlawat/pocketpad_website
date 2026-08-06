# Installs Flutter to C:\Users\admin\flutter (git works there).
# Does NOT move/delete C:\SDKs\flutter — delete that folder manually later.
# Run from any PowerShell window. Cursor can stay open.

$ErrorActionPreference = 'Stop'
$oldFlutter = 'C:\SDKs\flutter'
$newFlutter = 'C:\Users\admin\flutter'
$newBin = "$newFlutter\bin"
$oldBin = "$oldFlutter\bin"

function Update-FlutterPath {
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if ($null -eq $userPath) { $userPath = '' }

    $parts = $userPath -split ';' | Where-Object { $_ -and $_ -ne $oldBin }
    if ($parts -notcontains $newBin) {
        $parts = @($newBin) + $parts
    }
    $updated = ($parts -join ';').TrimEnd(';')
    [Environment]::SetEnvironmentVariable('Path', $updated, 'User')
    Write-Host "PATH now prefers $newBin" -ForegroundColor Green
}

if (Test-Path "$newFlutter\bin\flutter.bat") {
    Write-Host "Flutter already installed at $newFlutter" -ForegroundColor Green
} else {
    if (Test-Path $newFlutter) {
        throw "$newFlutter exists but looks incomplete. Delete it and re-run."
    }
    Write-Host "Cloning Flutter stable to $newFlutter ..." -ForegroundColor Cyan
    Write-Host "(This avoids moving the locked C:\SDKs\flutter folder.)" -ForegroundColor DarkGray
    git clone https://github.com/flutter/flutter.git -b stable --depth 1 $newFlutter
    if ($LASTEXITCODE -ne 0) { throw "git clone failed" }
}

Update-FlutterPath

$env:Path = "$newBin;" + [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

Write-Host ""
Write-Host "Upgrading Flutter (first run may take a few minutes) ..." -ForegroundColor Cyan
& "$newBin\flutter.bat" upgrade
& "$newBin\flutter.bat" --version

Write-Host ""
Write-Host "SUCCESS" -ForegroundColor Green
Write-Host "  New Flutter: $newFlutter"
Write-Host "  Old Flutter: $oldFlutter  (delete manually when nothing is using it)"
Write-Host ""
Write-Host "Restart terminals / Cursor, then run:" -ForegroundColor Yellow
Write-Host "  cd C:\Users\admin\Documents\Projects\gamepad\game_controller"
Write-Host "  flutter pub get"
Write-Host "  flutter build appbundle --release"
