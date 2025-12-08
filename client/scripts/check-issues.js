const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for common issues
    const issues = [];
    
    // Check for unbalanced braces
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      issues.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
    }
    
    // Check for .repeat with negative or variable that could be negative
    if (content.includes('.repeat(')) {
      const repeatMatches = content.match(/\.repeat\([^)]+\)/g);
      if (repeatMatches) {
        repeatMatches.forEach(match => {
          if (match.includes('-') || match.includes('length')) {
            issues.push(`Suspicious repeat call: ${match}`);
          }
        });
      }
    }
    
    if (issues.length > 0) {
      console.log(`\n⚠ ${filePath}:`);
      issues.forEach(issue => console.log(`  - ${issue}`));
    }
  } catch (err) {
    console.error(`✗ Error reading ${filePath}:`, err.message);
  }
}

function scanDir(dir, exclude = ['node_modules', '.next', 'dist']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!exclude.includes(file)) {
          scanDir(filePath, exclude);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        checkFile(filePath);
      }
    } catch (err) {
      // Skip
    }
  });
}

console.log('🔍 Checking for build issues...');
scanDir('app');
scanDir('src');
console.log('\n✅ Check complete!');
