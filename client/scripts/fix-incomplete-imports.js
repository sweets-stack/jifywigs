const fs = require('fs');
const path = require('path');

const fixes = [
  // Fix incomplete context imports
  { pattern: /from ['"]@\/contexts\/['"]/g, replacement: "from '@/contexts/AuthContext'" },
  { pattern: /from ['"]@\/contexts\/CartContext['"]/g, replacement: "from '@/contexts/CartContext'" },
  
  // Fix incomplete lib imports  
  { pattern: /from ['"]@\/lib\/['"]/g, replacement: "from '@/lib/utils'" },
];

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let changes = [];
  
  fixes.forEach(fix => {
    const matches = content.match(fix.pattern);
    if (matches) {
      // Check context: if it's CartContext, use that, otherwise use AuthContext
      if (fix.pattern.source.includes('contexts')) {
        if (content.includes('useCart') || content.includes('CartContext')) {
          content = content.replace(/from ['"]@\/contexts\/['"]/, "from '@/contexts/CartContext'");
        } else {
          content = content.replace(/from ['"]@\/contexts\/['"]/, "from '@/contexts/AuthContext'");
        }
      } else {
        content = content.replace(fix.pattern, fix.replacement);
      }
      modified = true;
      changes.push(fix.replacement);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
  }
}

function walkDir(dir, exclude = ['node_modules', '.next', 'dist']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!exclude.includes(file)) {
          walkDir(filePath, exclude);
        }
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        fixImports(filePath);
      }
    } catch (err) {
      // Skip
    }
  });
}

console.log('Fixing incomplete imports...\n');
walkDir('.');
console.log('\n✅ Import fixes complete!');