Write-Host "🚀 Starting TrackFit AI Development Environment..." -ForegroundColor Green
Write-Host ""

# Start Python Flask API
Write-Host "🐍 Starting Python Flask API on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python app.py" -WindowStyle Normal

# Wait for API to start
Write-Host "⏳ Waiting for API to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

# Start Web Server
Write-Host "🌐 Starting Web Server on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m http.server 8000" -WindowStyle Normal

Write-Host ""
Write-Host "✅ TrackFit is now running!" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 API Server: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🌐 Web App: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Opening web app in browser..." -ForegroundColor Green

# Open web app in browser
Start-Process "http://localhost:8000"

Write-Host "🎉 Development environment started successfully!" -ForegroundColor Green
Write-Host "Press any key to exit this script..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
