@echo off
echo Starting TrackFit AI Development Environment...
echo.

echo Starting Python Flask API on port 5000...
start "TrackFit API" cmd /k "python app.py"

echo Waiting 3 seconds for API to start...
timeout /t 3 /nobreak > nul

echo Starting Web Server on port 8000...
start "TrackFit Web" cmd /k "python -m http.server 8000"

echo.
echo TrackFit is now running!
echo.
echo API Server: http://localhost:5000
echo Web App: http://localhost:8000
echo.
echo Press any key to open the web app...
pause > nul

start http://localhost:8000
