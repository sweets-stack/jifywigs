const fs = require('fs');
const path = require('path');

function searchForRepeat(dir, exclude = ['node_modules', '.next', 'dist']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!exclude.includes(file)) {
          searchForRepeat(filePath, exclude);
        }
      } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Look for .repeat() calls
        if (content.includes('.repeat(')) {
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.includes('.repeat(')) {
              console.log(`\n${filePath}:${index + 1}`);
              console.log(`  ${line.trim()}`);
            }
          });
        }
      }
    } catch (err) {
      // Skip files that can't be read
    }
  });
}

console.log('🔍 Searching for .repeat() calls...\n');
searchForRepeat('.');
console.log('\n✅ Search complete!');
