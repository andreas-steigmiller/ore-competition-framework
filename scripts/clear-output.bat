@echo off
echo "Clearing output directories ..."
echo "Deleting all files in 'data/logs/' folder ..."
RMDIR /S /Q data\logs
echo "Deleting all files in 'data/response/' folder ..."
RMDIR /S /Q data\responses
echo "Clearing output directories completed."