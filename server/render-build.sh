#!/bin/bash
set -e

echo "📦 Installing root dependencies..."
npm install

echo "🔨 Building shared package..."
cd ../shared
npm install
npm run build
cd ../server

echo "🔨 Building server..."
npm run build

echo "✅ Build completed successfully!"