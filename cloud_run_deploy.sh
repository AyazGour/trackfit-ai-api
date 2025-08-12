#!/bin/bash

# Deploy Python API to Google Cloud Run
echo "🚀 Deploying to Google Cloud Run..."

# Set project
PROJECT_ID="trackfit-ai-web"
SERVICE_NAME="trackfit-ai-api"
REGION="us-central1"

# Build and deploy
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2

# Get the URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)')
echo "✅ Deployed to: $SERVICE_URL"

# Update config
echo "window.AI_API_BASE_URL = '$SERVICE_URL';" > ai_api_config.js
echo "✅ Updated ai_api_config.js" 