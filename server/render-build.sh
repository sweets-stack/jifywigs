#!/bin/bash
# Render Build Script
npm install
cd ../shared && npm install && npm run build
cd ../server
npm run build
