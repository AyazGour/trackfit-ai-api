#!/usr/bin/env python3
"""
Deploy AI Exercise Tracking API to Google Cloud Run
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e.stderr}")
        return None

def main():
    print("🚀 Deploying AI Exercise Tracking API to Google Cloud Run")
    print("=" * 60)
    
    # Check if gcloud is installed
    if run_command("gcloud --version", "Checking gcloud CLI") is None:
        print("❌ Google Cloud CLI not found!")
        print("Please install gcloud CLI first:")
        print("https://cloud.google.com/sdk/docs/install")
        return
    
    # Set project
    project_id = "trackfit-ai-web"
    service_name = "ai-exercise-api"
    region = "us-central1"
    
    # Set the project
    if run_command(f"gcloud config set project {project_id}", "Setting project") is None:
        return
    
    # Enable required APIs
    apis = [
        "run.googleapis.com",
        "cloudbuild.googleapis.com",
        "containerregistry.googleapis.com"
    ]
    
    for api in apis:
        if run_command(f"gcloud services enable {api}", f"Enabling {api}") is None:
            return
    
    # Build and deploy to Cloud Run
    image_name = f"gcr.io/{project_id}/{service_name}"
    
    print(f"🏗️ Building Docker image: {image_name}")
    if run_command(f"gcloud builds submit --tag {image_name}", "Building Docker image") is None:
        return
    
    print(f"🚀 Deploying to Cloud Run: {service_name}")
    deploy_command = f"""gcloud run deploy {service_name} \
        --image {image_name} \
        --platform managed \
        --region {region} \
        --allow-unauthenticated \
        --memory 2Gi \
        --cpu 2 \
        --timeout 300 \
        --concurrency 80"""
    
    if run_command(deploy_command, "Deploying to Cloud Run") is None:
        return
    
    # Get the service URL
    url_command = f"gcloud run services describe {service_name} --region {region} --format='value(status.url)'"
    result = run_command(url_command, "Getting service URL")
    
    if result:
        service_url = result.strip()
        print(f"\n🎉 AI API deployed successfully!")
        print(f"🌐 Service URL: {service_url}")
        print(f"📝 Update your web app to use: {service_url}/api")
        
        # Update the web app configuration
        update_web_app_config(service_url)
        
    else:
        print("❌ Failed to get service URL")

def update_web_app_config(api_url):
    """Update the web app to use the cloud API"""
    print(f"\n📝 Updating web app configuration...")
    
    # Create a config file for the API URL
    config_content = f"""// AI API Configuration
window.AI_API_BASE_URL = '{api_url}';
"""
    
    with open('ai_api_config.js', 'w') as f:
        f.write(config_content)
    
    print("✅ Created ai_api_config.js")
    print("📋 Next steps:")
    print("1. Add <script src='ai_api_config.js'></script> to your index.html")
    print("2. Update app.js to use window.AI_API_BASE_URL")
    print("3. Redeploy your web app with: firebase deploy")

if __name__ == "__main__":
    main() 