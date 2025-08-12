# TrackFit AI API - GitHub Upload Script

Write-Host "🚀 Uploading TrackFit AI API to GitHub..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "app.py")) {
    Write-Host "❌ Error: app.py not found. Please run this script from the project directory." -ForegroundColor Red
    exit 1
}

# Create .gitignore
$gitignore = @"
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Local files
.env
.env.local
"@

$gitignore | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host "✅ Created .gitignore" -ForegroundColor Green

# Try to find GitHub CLI
$ghPaths = @(
    "gh",
    "C:\Program Files\GitHub CLI\gh.exe",
    "$env:LOCALAPPDATA\GitHub CLI\gh.exe",
    "$env:APPDATA\GitHub CLI\gh.exe"
)

$ghFound = $false
foreach ($path in $ghPaths) {
    try {
        $result = & $path --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Found GitHub CLI at: $path" -ForegroundColor Green
            $ghFound = $true
            $ghPath = $path
            break
        }
    }
    catch {
        # Continue to next path
    }
}

if (-not $ghFound) {
    Write-Host "❌ GitHub CLI not found. Please install it from: https://cli.github.com/" -ForegroundColor Red
    Write-Host "📋 Manual steps:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Create repository: trackfit-ai-api" -ForegroundColor Yellow
    Write-Host "3. Upload these files:" -ForegroundColor Yellow
    Write-Host "   - app.py" -ForegroundColor Yellow
    Write-Host "   - requirements.txt" -ForegroundColor Yellow
    Write-Host "   - README.md" -ForegroundColor Yellow
    exit 1
}

# Create repository
Write-Host "📦 Creating GitHub repository..." -ForegroundColor Yellow
try {
    & $ghPath repo create trackfit-ai-api --public --source=. --remote=origin --push
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Repository created and pushed to GitHub!" -ForegroundColor Green
        Write-Host "🌐 Repository URL: https://github.com/$(git config user.name)/trackfit-ai-api" -ForegroundColor Cyan
        Write-Host "📋 Next steps:" -ForegroundColor Yellow
        Write-Host "1. Go to https://render.com" -ForegroundColor Yellow
        Write-Host "2. Create new Web Service" -ForegroundColor Yellow
        Write-Host "3. Connect to your GitHub repository" -ForegroundColor Yellow
        Write-Host "4. Configure:" -ForegroundColor Yellow
        Write-Host "   - Name: trackfit-ai-api" -ForegroundColor Yellow
        Write-Host "   - Environment: Python" -ForegroundColor Yellow
        Write-Host "   - Build Command: pip install -r requirements.txt" -ForegroundColor Yellow
        Write-Host "   - Start Command: python app.py" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Failed to create repository" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Error creating repository: $_" -ForegroundColor Red
    Write-Host "📋 Manual steps:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Create repository: trackfit-ai-api" -ForegroundColor Yellow
    Write-Host "3. Upload these files:" -ForegroundColor Yellow
    Write-Host "   - app.py" -ForegroundColor Yellow
    Write-Host "   - README.md" -ForegroundColor Yellow
} 