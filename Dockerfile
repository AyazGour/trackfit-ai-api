# Use Python 3.10 slim image for MediaPipe compatibility
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies for OpenCV/MediaPipe
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libgthread-2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application code
COPY . .

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Set environment variables for Flask
ENV PORT=8080
ENV HOST=0.0.0.0

# Run the application (update to your main file if needed)
CMD ["python", "app.py"] 