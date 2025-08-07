@echo off
echo 🎮 Starting Pokemon TCG Bot for Account 2...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed or not in PATH
    echo Please install Node.js and try again.
    pause
    exit /b 1
)

REM Check if config file exists
if not exist "..\config\main.json" (
    echo ❌ Error: config\main.json not found
    echo Please copy config\main.json.example to config\main.json and configure your accounts.
    pause
    exit /b 1
)

echo 🎮 Switching to Account 2...
node ..\scripts\switch-account.js 1
echo.
echo 🚀 Starting bot for Account 2...
node ..\approve.js
pause
