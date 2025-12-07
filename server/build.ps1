# build.ps1 - PowerShell build script
Write-Host "🔨 Building JifyWigs Server..." -ForegroundColor Cyan

# Clean dist folder
if (Test-Path "dist") {
    Write-Host "🧹 Cleaning dist folder..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force dist
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build TypeScript
Write-Host "📝 Compiling TypeScript..." -ForegroundColor Yellow
npx tsc

# Check if build succeeded
if (Test-Path "dist/server.js") {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "📁 Dist folder contents:" -ForegroundColor White
    Get-ChildItem dist -Recurse | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "❌ Build failed! dist/server.js not found." -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 Build completed successfully!" -ForegroundColor Green