#!/usr/bin/env python3
"""
Deploy TrackFit AI API to Render.com
This script helps you deploy your fixed CORS configuration
"""

import os
import subprocess
import sys

def check_git():
    """Check if git is available and repository is initialized"""
    try:
        result = subprocess.run(['git', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Git is available")
            return True
        else:
            print("❌ Git is not available")
            return False
    except FileNotFoundError:
        print("❌ Git is not installed")
        return False

def check_git_repo():
    """Check if current directory is a git repository"""
    try:
        result = subprocess.run(['git', 'status'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Current directory is a git repository")
            return True
        else:
            print("❌ Current directory is not a git repository")
            return False
    except FileNotFoundError:
        return False

def create_gitignore():
    """Create .gitignore file if it doesn't exist"""
    gitignore_content = """# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# MediaPipe cache
.mediapipe/

# Temporary files
*.tmp
*.temp
"""
    
    if not os.path.exists('.gitignore'):
        with open('.gitignore', 'w') as f:
            f.write(gitignore_content)
        print("✅ Created .gitignore file")
    else:
        print("✅ .gitignore already exists")

def deploy_to_render():
    """Deploy to Render.com"""
    print("\n🚀 Deploying to Render.com...")
    print("\n📋 Steps to deploy:")
    print("1. Push your code to GitHub (if not already done)")
    print("2. Go to https://render.com")
    print("3. Sign in with GitHub")
    print("4. Click 'New +' → 'Web Service'")
    print("5. Connect your GitHub repository")
    print("6. Configure the service:")
    print("   - Name: trackfit-ai-api")
    print("   - Environment: Python")
    print("   - Build Command: pip install -r requirements_render.txt")
    print("   - Start Command: python app.py")
    print("   - Port: 5000")
    print("7. Click 'Create Web Service'")
    
    print("\n🔗 After deployment, update your ai_api_config.js with the new URL")
    print("   Example: window.AI_API_BASE_URL = 'https://your-app.onrender.com';")

def main():
    print("🎯 TrackFit AI API - Render.com Deployment Helper")
    print("=" * 50)
    
    # Check prerequisites
    if not check_git():
        print("\n❌ Please install Git first: https://git-scm.com/")
        return
    
    if not check_git_repo():
        print("\n❌ Please initialize git repository first:")
        print("   git init")
        print("   git add .")
        print("   git commit -m 'Initial commit'")
        return
    
    # Create gitignore
    create_gitignore()
    
    # Check if files are committed
    try:
        result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
        if result.stdout.strip():
            print("\n⚠️  You have uncommitted changes:")
            print(result.stdout)
            print("\n💡 Consider committing your changes before deploying:")
            print("   git add .")
            print("   git commit -m 'Fix CORS configuration'")
        else:
            print("✅ All changes are committed")
    except:
        pass
    
    # Deploy instructions
    deploy_to_render()
    
    print("\n🎉 Deployment helper completed!")
    print("\n📚 For more details, check:")
    print("   - https://render.com/docs/deploy-flask")
    print("   - Your render.yaml file")

if __name__ == "__main__":
    main()
