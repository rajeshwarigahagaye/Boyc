#!/bin/bash

# GitHub Pages Deployment Script for BOYC

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the boyc directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output is in the 'dist' folder"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes to GitHub"
    echo "2. GitHub Actions will automatically deploy to GitHub Pages"
    echo "3. Your site will be available at: https://username.github.io/repository-name/"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
