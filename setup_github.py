#!/usr/bin/env python3
"""
Setup GitHub Repository for TrackFit AI API Deployment
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully")
            return result.stdout.strip()
        else:
            print(f"❌ {description} failed:")
            print(f"Error: {result.stderr}")
            return None
    except Exception as e:
        print(f"❌ {description} failed with exception: {e}")
        return None

def setup_github():
    """Setup GitHub repository"""
    print("🎯 Setting up GitHub Repository for TrackFit AI API")
    print("=" * 60)
    
    # Check if git is available
    if not run_command("git --version", "Checking Git availability"):
        print("\n❌ Git is not available. Please install Git first.")
        return False
    
    # Check if we're in a git repository
    if not os.path.exists('.git'):
        print("\n❌ Not in a git repository. Please run 'git init' first.")
        return False
    
    print("\n📋 GitHub Repository Setup Steps:")
    print("1. Go to https://github.com")
    print("2. Sign in to your account")
    print("3. Click the '+' icon → 'New repository'")
    print("4. Repository name: trackfit-ai-api")
    print("5. Description: AI-powered exercise tracking API with MediaPipe")
    print("6. Make it Public (for free Render.com deployment)")
    print("7. Don't initialize with README (we already have one)")
    print("8. Click 'Create repository'")
    
    # Get repository URL
    repo_url = input("\n🔗 Enter your GitHub repository URL (e.g., https://github.com/username/trackfit-ai-api): ").strip()
    
    if not repo_url:
        print("❌ Repository URL is required")
        return False
    
    # Add remote origin
    if not run_command(f'git remote add origin {repo_url}', "Adding GitHub remote"):
        return False
    
    # Push to GitHub
    if not run_command("git branch -M main", "Setting main branch"):
        return False
    
    if not run_command("git push -u origin main", "Pushing to GitHub"):
        print("\n⚠️  Push failed. This might be your first push.")
        print("💡 Try these commands manually:")
        print(f"   git remote add origin {repo_url}")
        print("   git branch -M main")
        print("   git push -u origin main")
        return False
    
    print("\n🎉 GitHub repository setup completed!")
    print(f"🔗 Your code is now available at: {repo_url}")
    return True

def deploy_to_render():
    """Instructions for Render.com deployment"""
    print("\n🚀 Render.com Deployment Instructions:")
    print("=" * 50)
    print("1. Go to https://render.com")
    print("2. Sign in with GitHub")
    print("3. Click 'New +' → 'Web Service'")
    print("4. Connect your GitHub repository")
    print("5. Configure the service:")
    print("   - Name: trackfit-ai-api")
    print("   - Environment: Python")
    print("   - Build Command: pip install -r requirements_render.txt")
    print("   - Start Command: python app.py")
    print("   - Port: 5000")
    print("6. Click 'Create Web Service'")
    print("7. Wait for deployment (usually 5-10 minutes)")
    
    print("\n🔗 After deployment, you'll get a URL like:")
    print("   https://trackfit-ai-api-xxxxx.onrender.com")
    
    print("\n📝 Update your ai_api_config.js with the new URL:")
    print("   window.AI_API_BASE_URL = 'https://your-app.onrender.com';")

def main():
    """Main function"""
    print("🎯 TrackFit AI API - GitHub & Render.com Setup")
    print("=" * 60)
    
    # Setup GitHub
    if setup_github():
        # Deploy to Render
        deploy_to_render()
        
        print("\n🎉 Setup completed successfully!")
        print("\n📚 Next steps:")
        print("1. Deploy to Render.com using the instructions above")
        print("2. Test your CORS fixes on the hosted environment")
        print("3. Update your web app to use the new API URL")
    else:
        print("\n❌ Setup failed. Please check the errors above.")
        print("\n💡 Manual setup:")
        print("1. Create GitHub repository manually")
        print("2. Add remote: git remote add origin <your-repo-url>")
        print("3. Push: git push -u origin main")
        print("4. Deploy to Render.com")

if __name__ == "__main__":
    main()
