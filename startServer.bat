@echo off
start "server" cmd /k node server.js
timeout /t 3
start http://localhost:3000