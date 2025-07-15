#!/bin/bash

echo "Setting up EO Compliance Web App for development..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install Python dependencies
echo "Installing Python dependencies..."
cd api
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
else
    echo "Error: requirements.txt not found in api directory"
    exit 1
fi
cd ..

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
if [ -f "package.json" ]; then
    npm install
else
    echo "Error: package.json not found in root directory"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please edit .env file with your configuration"
fi

echo ""
echo "Setup complete! To run the application in development:"
echo ""
echo "1. Start the Python API (in one terminal):"
echo "   cd api && python3 main.py"
echo ""
echo "2. Start the Next.js frontend (in another terminal):"
echo "   npm run dev"
echo ""
echo "The frontend will be available at http://localhost:3000"
echo "The API will be available at http://localhost:8000"
