@echo off
echo 🎮 Starting Pokemon TCG Bot for current account...
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

echo 📋 Loading current account configuration...
node ..\scripts\list-accounts.js

echo.
echo 🚀 Starting bot for current account (activeAccountIndex)...
echo 💡 Tip: Edit config\main.json to change activeAccountIndex
echo.

REM Start the bot using current activeAccountIndex
node ..\approve.js

pause
