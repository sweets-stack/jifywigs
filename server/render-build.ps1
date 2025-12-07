# render-build.ps1 - Windows PowerShell build script
Write-Host "=== Starting Render Build Process ===" -ForegroundColor Green

# Install server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Yellow
npm install

# Build shared folder first
Write-Host "Building shared folder..." -ForegroundColor Yellow
Set-Location ../shared
npm install
npm run build
Set-Location ../server

# Build TypeScript
Write-Host "Building TypeScript..." -ForegroundColor Yellow
npm run build

# Verify build output
Write-Host "Build completed. Checking dist folder:" -ForegroundColor Green
Get-ChildItem -Path dist -Force

Write-Host "=== Build Process Complete ===" -ForegroundColor Green