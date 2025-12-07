#!/bin/bash
echo "=== Starting Render Build Process ==="

# Install client dependencies
echo "Installing client dependencies..."
npm install

# Build shared folder
echo "Building shared folder..."
cd ../shared
npm install
npm run build
cd ../client

# Build Next.js
echo "Building Next.js..."
npm run build

echo "=== Build Process Complete ==="
