#!/bin/bash

# Start server in background
node server.js &

# Wait for server to start
sleep 3

# Opens browser window
if which xdg-open > /dev/null; then
    xdg-open http://localhost:3000
elif which gnome-open > /dev/null; then
    gnome-open http://localhost:3000
else
    open http://localhost:3000
fi
