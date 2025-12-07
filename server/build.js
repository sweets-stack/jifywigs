const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔨 Building server for production...');

// Create dist folder if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy package.json to dist
fs.copyFileSync('package.json', 'dist/package.json');

// Run TypeScript compiler
try {
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}