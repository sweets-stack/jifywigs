const fs = require('fs');
const path = require('path');

const importFixes = [
  // Fix lib imports
  { from: /from ['"]\.\.\/\.\.\/\.\.\/src\/lib\/utils['"]/g, to: "from '@/lib/utils'" },
  { from: /from ['"]\.\.\/\.\.\/\.\.\/lib\/utils['"]/g, to: "from '@/lib/utils'" },
  { from: /from ['"]\.\.\/\.\.\/lib\/utils['"]/g, to: "from '@/lib/utils'" },
  { from: /from ['"]\.\.\/lib\/utils['"]/g, to: "from '@/lib/utils'" },
  
  // Fix context imports
  { from: /from ['"]\.\.\/\.\.\/contexts\/AuthContext['"]/g, to: "from '@/contexts/AuthContext'" },
  { from: /from ['"]\.\.\/\.\.\/contexts\/CartContext['"]/g, to: "from '@/contexts/CartContext'" },
  { from: /from ['"]\.\.\/contexts\/AuthContext['"]/g, to: "from '@/contexts/AuthContext'" },
  { from: /from ['"]\.\.\/contexts\/CartContext['"]/g, to: "from '@/contexts/CartContext'" },
  
  // Fix component imports
  { from: /from ['"]\.\.\/\.\.\/\.\.\/components\//g, to: "from '@/components/" },
  { from: /from ['"]\.\.\/\.\.\/components\//g, to: "from '@/components/" },
  { from: /from ['"]\.\.\/components\//g, to: "from '@/components/" },
  
  // Fix hooks imports
  { from: /from ['"]\.\.\/\.\.\/hooks\//g, to: "from '@/hooks/" },
  { from: /from ['"]\.\.\/hooks\//g, to: "from '@/hooks/" },
  
  // Fix types imports
  { from: /from ['"]\.\.\/\.\.\/types\//g, to: "from '@/types/" },
  { from: /from ['"]\.\.\/types\//g, to: "from '@/types/" },
  
  // Fix src/lib imports
  { from: /from ['"]\.\.\/\.\.\/\.\.\/src\/lib\//g, to: "from '@/lib/" },
  { from: /from ['"]\.\.\/\.\.\/src\/lib\//g, to: "from '@/lib/" },
  { from: /from ['"]\.\.\/src\/lib\//g, to: "from '@/lib/" },
];

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let changes = [];
  
  importFixes.forEach(fix => {
    if (fix.from.test(content)) {
      const beforeMatch = content.match(fix.from);
      content = content.replace(fix.from, fix.to);
      modified = true;
      changes.push(fix.to);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    if (changes.length > 0) {
      console.log(`  → ${changes.join(', ')}`);
    }
  }
}

function scanDirectory(dir, exclude = ['node_modules', '.next', 'dist', 'build']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!exclude.includes(file)) {
          scanDirectory(filePath, exclude);
        }
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        fixImports(filePath);
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
    }
  });
}

console.log('🔧 Fixing imports across the project...\n');
scanDirectory('.');
console.log('\n✅ Import fixes complete!');
