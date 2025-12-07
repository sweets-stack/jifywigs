#!/bin/bash
# Install server dependencies
npm install

# Build shared folder first
cd ../shared
npm install
npm run build
cd ../server

# Build TypeScript
npm run build

# Verify build output
echo "Build completed. Checking dist folder:"
ls -la dist/