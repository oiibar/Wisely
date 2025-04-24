@echo off
set PORT=10000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
    echo Killing PID %%a using port %PORT%
    taskkill /F /PID %%a
)
