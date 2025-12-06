#!/usr/bin/env python3
"""
Project Auto-Introspector
Automatically analyzes any codebase and generates detailed documentation.
"""

import os
import json
import re
import sys
import hashlib
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional, Any
import datetime
from dataclasses import dataclass, asdict, field
import time

@dataclass
class ProjectInfo:
    """Data structure for project information"""
    projectName: str = ""
    projectSummary: str = ""
    detectedStack: List[str] = field(default_factory=list)
    architecture: Dict[str, Any] = field(default_factory=dict)
    keyFiles: List[str] = field(default_factory=list)
    dependencies: List[str] = field(default_factory=list)
    howToRun: List[str] = field(default_factory=list)
    APIsDetected: List[Dict] = field(default_factory=list)
    unfinishedFeaturesOrTODOs: List[Dict] = field(default_factory=list)
    importantNotesForNextDeveloper: str = ""

class ProjectScanner:
    """Main scanner class that analyzes the project"""
    
    # File extensions to analyze
    CODE_EXTENSIONS = {
        '.py', '.js', '.jsx', '.ts', '.tsx', '.java', '.cpp', '.c', '.h', '.hpp',
        '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.scala', '.cs', '.fs',
        '.html', '.htm', '.css', '.scss', '.sass', '.less',
        '.json', '.yaml', '.yml', '.xml', '.toml', '.ini', '.cfg', '.conf',
        '.md', '.txt', '.rst', '.sql', '.sh', '.bat', '.ps1'
    }
    
    def should_ignore(self, path_str: str) -> bool:
        """Check if a path should be ignored"""
        # Convert to lowercase for case-insensitive comparison
        path_lower = path_str.lower().replace('\\', '/')
        
        # Ignore patterns
        ignore_patterns = [
            # Common dependency directories
            '/node_modules/',
            '\\node_modules\\',
            'node_modules/',
            'node_modules\\',
            # Version control
            '/.git/',
            '\\.git\\',
            '.git/',
            '.git\\',
            # Python cache
            '/__pycache__/',
            '\\__pycache__\\',
            '__pycache__/',
            '__pycache__\\',
            '.pyc',
            # Environment directories
            '/.venv/',
            '\\.venv\\',
            '.venv/',
            '.venv\\',
            '/venv/',
            '\\venv\\',
            'venv/',
            'venv\\',
            '/env/',
            '\\env\\',
            'env/',
            'env\\',
            # IDE directories
            '/.vscode/',
            '\\.vscode\\',
            '.vscode/',
            '.vscode\\',
            '/.idea/',
            '\\.idea\\',
            '.idea/',
            '.idea\\',
            # Build outputs
            '/dist/',
            '\\dist\\',
            'dist/',
            'dist\\',
            '/build/',
            '\\build\\',
            'build/',
            'build\\',
            '/target/',
            '\\target\\',
            'target/',
            'target\\',
            '/out/',
            '\\out\\',
            'out/',
            'out\\',
            # Binary files
            '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico',
            '.pdf', '.doc', '.docx', '.xls', '.xlsx',
            '.mp3', '.mp4', '.avi', '.mov',
            '.zip', '.tar', '.gz', '.rar',
            '.exe', '.dll', '.so', '.dylib',
            # Large data files
            '.db', '.sqlite', '.sqlite3',
        ]
        
        for pattern in ignore_patterns:
            if pattern.startswith('/') or pattern.startswith('\\'):
                # Directory pattern
                if pattern in path_lower:
                    return True
            elif path_lower.endswith(pattern):
                return True
        
        # Also ignore if any parent directory is node_modules
        parts = path_lower.split('/')
        if 'node_modules' in parts:
            return True
            
        return False
    
    # Framework detection patterns
    FRAMEWORK_PATTERNS = {
        'Next.js': ['next.config.js', 'next.config.ts', 'pages/', 'app/', '_app.js', '_app.tsx'],
        'React': ['react', 'react-dom', 'jsx', 'tsx', 'createElement'],
        'Vue.js': ['vue', '.vue', 'vue.config.js'],
        'Angular': ['angular', '@angular', 'angular.json'],
        'Express.js': ['express', 'app.js', 'app.use', 'router.get'],
        'Django': ['manage.py', 'django', 'settings.py', 'urls.py', 'wsgi.py'],
        'Flask': ['flask', 'app.py', '__init__.py', 'from flask import'],
        'Laravel': ['artisan', 'laravel', 'app/Http', 'resources/'],
        'Spring Boot': ['pom.xml', 'application.properties', '@SpringBootApplication'],
        'Node.js': ['package.json', 'node_modules', 'npm start'],
        'TypeScript': ['tsconfig.json', '.ts', '.tsx', 'typescript'],
        'MongoDB': ['mongoose', 'mongodb', 'MongoClient'],
        'PostgreSQL': ['postgresql', 'pg', 'psycopg2', 'sequelize'],
        'MySQL': ['mysql', 'mysql2', 'mysqli'],
        'SQLite': ['sqlite', '.db', '.sqlite'],
        'Redis': ['redis', 'ioredis'],
        'GraphQL': ['graphql', 'apollo', 'gql'],
        'Docker': ['Dockerfile', 'docker-compose.yml'],
        'Kubernetes': ['kube', 'deployment.yaml', 'service.yaml'],
        'AWS': ['aws-sdk', 'boto3', 'lambda'],
        'Firebase': ['firebase', 'firestore'],
        'Tailwind CSS': ['tailwind', 'tailwind.config.js'],
        'Bootstrap': ['bootstrap', 'bootstrap.css'],
        'Vite': ['vite.config.js', 'vite.config.ts', 'vite'],
    }
    
    def __init__(self, project_path: str):
        self.project_path = Path(project_path).resolve()
        self.project_name = self.project_path.name
        self.file_hashes = {}
        self.watch_mode = False
        self.last_scan_time = 0
        
    def get_file_hash(self, filepath: Path) -> str:
        """Get hash of file for change detection"""
        try:
            content = filepath.read_bytes()
            return hashlib.md5(content).hexdigest()
        except:
            return ""
    
    def scan_directory(self) -> Dict:
        """Scan the entire project directory"""
        print(f"🔍 Scanning project: {self.project_name}")
        
        all_files = []
        total_size = 0
        scanned_folders = set()
        
        for root, dirs, files in os.walk(self.project_path):
            root_path = Path(root)
            
            # Filter out ignored directories BEFORE processing
            dirs[:] = [d for d in dirs if not self.should_ignore(str(root_path / d))]
            
            for file in files:
                filepath = root_path / file
                filepath_str = str(filepath)
                
                if self.should_ignore(filepath_str):
                    continue
                
                # Check file extension
                ext = filepath.suffix.lower()
                if ext in self.CODE_EXTENSIONS or file in ['Dockerfile', 'Makefile', 'docker-compose.yml', 'package.json', 'requirements.txt', 'server.js', 'app.js', 'index.js', 'main.py', 'manage.py']:
                    all_files.append(filepath)
                    total_size += filepath.stat().st_size
                    
                    # Track folders
                    folder = str(filepath.parent.relative_to(self.project_path))
                    if folder != '.':
                        scanned_folders.add(folder)
        
        print(f"📁 Found {len(all_files)} code/config files in {len(scanned_folders)} folders ({total_size/1024/1024:.1f} MB)")
        if scanned_folders:
            sorted_folders = sorted(scanned_folders)
            print(f"📂 Folders scanned: {', '.join(sorted_folders[:10])}{'...' if len(sorted_folders) > 10 else ''}")
        return {
            'files': all_files,
            'total_size': total_size
        }
    
    def detect_stack(self, files: List[Path]) -> List[str]:
        """Detect technology stack"""
        detected = set()
        file_names = [f.name for f in files]
        file_paths = [str(f.relative_to(self.project_path)).replace('\\', '/') for f in files]
        
        # Check for framework-specific files
        for framework, patterns in self.FRAMEWORK_PATTERNS.items():
            for pattern in patterns:
                if pattern.endswith('/'):
                    # Directory pattern
                    if any(pattern[:-1] in path for path in file_paths):
                        detected.add(framework)
                elif pattern in file_names:
                    detected.add(framework)
                elif any(pattern in str(f).replace('\\', '/') for f in file_paths):
                    detected.add(framework)
        
        # Read package.json for Node.js projects (excluding node_modules)
        for package_file in self.project_path.rglob('package.json'):
            if self.should_ignore(str(package_file)):
                continue
                
            try:
                with open(package_file, 'r') as f:
                    data = json.load(f)
                    deps = list(data.get('dependencies', {}).keys()) + list(data.get('devDependencies', {}).keys())
                    
                    # Check dependencies against frameworks
                    for dep in deps:
                        for framework, patterns in self.FRAMEWORK_PATTERNS.items():
                            if any(pattern.lower() in dep.lower() for pattern in patterns if not pattern.endswith('/') and not '/' in pattern):
                                detected.add(framework)
            except:
                pass
        
        # Read requirements.txt for Python projects
        for req_file in self.project_path.rglob('requirements.txt'):
            if self.should_ignore(str(req_file)):
                continue
                
            try:
                with open(req_file, 'r') as f:
                    content = f.read().lower()
                    for framework, patterns in self.FRAMEWORK_PATTERNS.items():
                        if any(pattern.lower() in content for pattern in patterns if not pattern.endswith('/') and not '/' in pattern):
                            detected.add(framework)
            except:
                pass
        
        return sorted(list(detected))
    
    def analyze_file_content(self, filepath: Path) -> Dict:
        """Extract information from file content"""
        try:
            content = filepath.read_text(encoding='utf-8', errors='ignore')
            rel_path = str(filepath.relative_to(self.project_path)).replace('\\', '/')
            
            info = {
                'path': rel_path,
                'todos': [],
                'apis': [],
                'imports': [],
                'config': {}
            }
            
            # Find TODO/FIXME comments
            todo_patterns = [
                r'#\s*(TODO|FIXME|HACK|BUG|XXX):?\s*(.*)',
                r'//\s*(TODO|FIXME|HACK|BUG|XXX):?\s*(.*)',
                r'/\*\s*(TODO|FIXME|HACK|BUG|XXX):?\s*(.*?)\*/',
            ]
            
            for pattern in todo_patterns:
                for match in re.finditer(pattern, content, re.IGNORECASE | re.MULTILINE):
                    info['todos'].append({
                        'type': match.group(1).upper(),
                        'text': match.group(2).strip(),
                        'line': content[:match.start()].count('\n') + 1
                    })
            
            # Detect API routes (common patterns)
            api_patterns = [
                (r'router\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']', 'Express.js'),
                (r'@(Get|Post|Put|Delete|Patch)\(["\']([^"\']+)["\']', 'NestJS/Spring'),
                (r'path\(["\']([^"\']+)["\']\)', 'Django'),
                (r'@app\.route\(["\']([^"\']+)["\']\)', 'Flask'),
                (r'Route::(get|post|put|delete)\(["\']([^"\']+)["\']', 'Laravel'),
                (r'app\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']', 'Express.js'),
            ]
            
            for pattern, framework in api_patterns:
                for match in re.finditer(pattern, content, re.IGNORECASE):
                    path = match.group(2) if len(match.groups()) > 1 else match.group(1)
                    method = match.group(1).upper() if len(match.groups()) > 0 else 'GET'
                    info['apis'].append({
                        'path': path,
                        'method': method,
                        'framework': framework,
                        'file': rel_path
                    })
            
            # Extract imports
            import_patterns = [
                r'import\s+.*?\s+from\s+["\']([^"\']+)["\']',  # ES6 imports
                r'require\(["\']([^"\']+)["\']\)',  # CommonJS
                r'using\s+([^;]+);',  # C#
                r'#include\s+[<"]([^>"]+)[>"]',  # C/C++
            ]
            
            for pattern in import_patterns:
                for match in re.finditer(pattern, content):
                    info['imports'].append(match.group(1))
            
            # Extract configuration (common patterns)
            config_patterns = [
                (r'PORT\s*=\s*(\d+)', 'port'),
                (r'DATABASE_URL\s*=\s*["\']([^"\']+)["\']', 'database_url'),
                (r'DEBUG\s*=\s*(True|False)', 'debug'),
                (r'NODE_ENV\s*=\s*["\']([^"\']+)["\']', 'environment'),
                (r'MONGODB_URI\s*=\s*["\']([^"\']+)["\']', 'mongodb_uri'),
                (r'MONGO_URI\s*=\s*["\']([^"\']+)["\']', 'mongo_uri'),
            ]
            
            for pattern, key in config_patterns:
                match = re.search(pattern, content)
                if match:
                    info['config'][key] = match.group(1)
            
            return info
            
        except Exception as e:
            return {
                'path': str(filepath.relative_to(self.project_path)).replace('\\', '/'),
                'error': str(e)
            }
    
    def analyze_architecture(self, files: List[Path], stack: List[str]) -> Dict:
        """Analyze project architecture"""
        dirs = set()
        frontend_dirs = set()
        backend_dirs = set()
        api_dirs = set()
        
        for file in files:
            rel_path = str(file.relative_to(self.project_path)).replace('\\', '/')
            parts = rel_path.split('/')
            
            if len(parts) > 1:
                dirs.add(parts[0])
                
                # Common frontend directories
                if any(d in parts[0].lower() for d in ['src', 'app', 'components', 'pages', 'public', 'static', 'client', 'frontend']):
                    frontend_dirs.add(parts[0])
                
                # Common backend directories
                if any(d in parts[0].lower() for d in ['server', 'api', 'controllers', 'models', 'routes', 'middleware', 'backend', 'server', 'services']):
                    backend_dirs.add(parts[0])
                
                # API specific directories
                if any('api' in part.lower() for part in parts):
                    api_dirs.add(parts[0])
        
        # Also check for backend in any path
        for file in files:
            rel_path = str(file.relative_to(self.project_path)).replace('\\', '/')
            if 'backend' in rel_path.lower() and 'node_modules' not in rel_path.lower():
                backend_dirs.add('backend')
                break
        
        architecture = {
            'frontend': ', '.join(sorted(frontend_dirs)) if frontend_dirs else 'Not detected',
            'backend': ', '.join(sorted(backend_dirs)) if backend_dirs else 'Not detected',
            'database': self.detect_database(files),
            'majorDirectories': sorted(list(dirs)),
            'apiDirectories': sorted(list(api_dirs))
        }
        
        return architecture
    
    def detect_database(self, files: List[Path]) -> str:
        """Detect database from files"""
        db_indicators = {
            'MongoDB': 0,
            'PostgreSQL': 0,
            'MySQL': 0,
            'SQLite': 0,
            'Redis': 0
        }
        
        for file in files:
            try:
                content = file.read_text(encoding='utf-8', errors='ignore').lower()
                
                # Check for MongoDB indicators
                if 'mongoose' in content or 'mongodb' in content:
                    db_indicators['MongoDB'] += 1
                
                # Check for PostgreSQL indicators
                if 'postgresql' in content or 'postgres' in content or 'psycopg' in content:
                    db_indicators['PostgreSQL'] += 1
                
                # Check for MySQL indicators
                if 'mysql' in content and 'mysql2' not in content:
                    db_indicators['MySQL'] += 1
                
                # Check for SQLite indicators
                if 'sqlite' in content:
                    db_indicators['SQLite'] += 1
                
                # Check for Redis indicators
                if 'redis' in content or 'ioredis' in content:
                    db_indicators['Redis'] += 1
                    
            except:
                continue
        
        # Check file names for database files
        for file in files:
            name = file.name.lower()
            if any(db in name for db in ['.sql', 'schema', 'migration', '.db', '.sqlite']):
                db_indicators['SQLite'] += 1
        
        # Find the database with the highest count
        max_db = max(db_indicators.items(), key=lambda x: x[1])
        
        if max_db[1] > 0:
            return max_db[0]
        
        return 'Unknown or no database detected'
    
    def extract_dependencies(self, files: List[Path]) -> List[str]:
        """Extract dependencies from package files - EXCLUDING node_modules"""
        dependencies = set()
        
        # Check for package.json files anywhere in project (excluding node_modules)
        for package_json in self.project_path.rglob('package.json'):
            package_str = str(package_json)
            
            # Skip if in node_modules
            if self.should_ignore(package_str):
                continue
                
            try:
                with open(package_json, 'r') as f:
                    data = json.load(f)
                    deps = list(data.get('dependencies', {}).keys())
                    dev_deps = list(data.get('devDependencies', {}).keys())
                    
                    # Add location context
                    rel_path = str(package_json.relative_to(self.project_path)).replace('\\', '/')
                    location = f" ({rel_path})"
                    
                    # Only add main project dependencies (not from node_modules)
                    for dep in deps:
                        # Filter out common dev/test dependencies that might appear
                        if any(test_dep in dep.lower() for test_dep in ['test', 'jest', 'mocha', 'chai', 'ava', 'tape', 'xo']):
                            continue
                        dependencies.add(f"{dep}{location} (prod)")
                    for dep in dev_deps:
                        if any(test_dep in dep.lower() for test_dep in ['test', 'jest', 'mocha', 'chai', 'ava', 'tape', 'xo']):
                            continue
                        dependencies.add(f"{dep}{location} (dev)")
            except:
                pass
        
        # Check for requirements.txt files
        for requirements in self.project_path.rglob('requirements.txt'):
            if self.should_ignore(str(requirements)):
                continue
                
            try:
                with open(requirements, 'r') as f:
                    rel_path = str(requirements.relative_to(self.project_path)).replace('\\', '/')
                    location = f" ({rel_path})"
                    
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith('#'):
                            # Clean up version specifiers
                            dep_name = line.split('>')[0].split('<')[0].split('=')[0].split('~')[0].strip()
                            if dep_name:
                                dependencies.add(f"{dep_name}{location} (Python)")
            except:
                pass
        
        # Check for pom.xml (Maven)
        for pom in self.project_path.rglob('pom.xml'):
            if self.should_ignore(str(pom)):
                continue
            rel_path = str(pom.relative_to(self.project_path)).replace('\\', '/')
            dependencies.add(f"Maven dependencies ({rel_path})")
        
        # Check for build.gradle
        for build_gradle in self.project_path.rglob('build.gradle'):
            if self.should_ignore(str(build_gradle)):
                continue
            rel_path = str(build_gradle.relative_to(self.project_path)).replace('\\', '/')
            dependencies.add(f"Gradle dependencies ({rel_path})")
        
        # Check for build.gradle.kts
        for build_gradle_kts in self.project_path.rglob('build.gradle.kts'):
            if self.should_ignore(str(build_gradle_kts)):
                continue
            rel_path = str(build_gradle_kts.relative_to(self.project_path)).replace('\\', '/')
            dependencies.add(f"Gradle Kotlin dependencies ({rel_path})")
        
        return sorted(list(dependencies))
    
    def detect_run_commands(self, files: List[Path]) -> List[str]:
        """Detect how to run the project - EXCLUDING node_modules"""
        commands = []
        
        # Check package.json scripts from project directories only
        for package_json in self.project_path.rglob('package.json'):
            package_str = str(package_json)
            
            # Skip if in node_modules
            if self.should_ignore(package_str):
                continue
                
            try:
                with open(package_json, 'r') as f:
                    data = json.load(f)
                    scripts = data.get('scripts', {})
                    rel_path = str(package_json.relative_to(self.project_path)).replace('\\', '/')
                    
                    for name, cmd in scripts.items():
                        # Skip test-related scripts from being main run commands
                        if any(test_word in name.lower() for test_word in ['test', 'lint', 'check', 'audit', 'coverage']):
                            continue
                            
                        if rel_path != 'package.json':
                            dir_path = os.path.dirname(rel_path)
                            if dir_path == '.':
                                commands.append(f"npm run {name} # {cmd}")
                            else:
                                commands.append(f"cd {dir_path} && npm run {name} # {cmd}")
                        else:
                            commands.append(f"npm run {name} # {cmd}")
            except:
                pass
        
        # Check for common files in root
        common_files = {
            'package.json': 'npm install && npm start',
            'manage.py': 'python manage.py runserver',
            'app.py': 'python app.py',
            'docker-compose.yml': 'docker-compose up',
            'Dockerfile': 'docker build -t app . && docker run app',
            'Makefile': 'make run or make start',
            'gradlew': './gradlew bootRun',
            'pom.xml': 'mvn spring-boot:run',
        }
        
        for filename, cmd in common_files.items():
            if (self.project_path / filename).exists():
                commands.append(cmd)
        
        # Check for server files in backend (not in node_modules)
        for server_file in ['server.js', 'app.js', 'index.js', 'main.js']:
            for path in self.project_path.rglob(server_file):
                if self.should_ignore(str(path)):
                    continue
                    
                rel_path = str(path.relative_to(self.project_path)).replace('\\', '/')
                if ('backend' in rel_path.lower() or 'server' in rel_path.lower()) and 'node_modules' not in rel_path.lower():
                    dir_path = os.path.dirname(rel_path)
                    if dir_path == '.':
                        commands.append(f"node {server_file}")
                    else:
                        commands.append(f"cd {dir_path} && node {server_file}")
        
        # Check README for commands from project README files only
        readme_patterns = ['README.md', 'README.txt', 'README', 'readme.md']
        for readme_pattern in readme_patterns:
            for readme_path in self.project_path.rglob(readme_pattern):
                if self.should_ignore(str(readme_path)):
                    continue
                    
                try:
                    content = readme_path.read_text(encoding='utf-8', errors='ignore')
                    rel_path = str(readme_path.relative_to(self.project_path)).replace('\\', '/')
                    
                    # Look for code blocks with commands
                    for match in re.finditer(r'```(?:bash|sh|shell|cmd|powershell)?\n(.*?)\n```', content, re.DOTALL | re.IGNORECASE):
                        lines = match.group(1).split('\n')
                        for line in lines:
                            line = line.strip()
                            if line and any(keyword in line.lower() for keyword in ['run', 'start', 'install', 'build', 'dev', 'server', 'python', 'node', 'docker']):
                                if 'node_modules' not in line and 'npm test' not in line:
                                    if rel_path != 'README.md':
                                        commands.append(f"# From {rel_path}: {line}")
                                    else:
                                        commands.append(line)
                except:
                    pass
        
        # Clean up and deduplicate commands
        clean_commands = []
        seen = set()
        for cmd in commands:
            # Extract just the command part for deduplication
            cmd_clean = cmd.split('#')[0].strip() if '#' in cmd else cmd.strip()
            cmd_clean = cmd_clean.replace('# From ', '').replace(': ', '')
            
            # Filter out commands that are clearly from node_modules
            if cmd_clean and 'node_modules' not in cmd_clean.lower():
                if cmd_clean not in seen:
                    seen.add(cmd_clean)
                    clean_commands.append(cmd)
        
        return clean_commands[:10]  # Return max 10 unique commands
    
    def generate_summary(self, files: List[Path], stack: List[str]) -> str:
        """Generate project summary"""
        summary_parts = []
        
        # Check for README files
        readme_content = ""
        for readme in ['README.md', 'README.txt', 'README']:
            readme_path = self.project_path / readme
            if readme_path.exists() and not self.should_ignore(str(readme_path)):
                try:
                    readme_content = readme_path.read_text(encoding='utf-8', errors='ignore')[:1000]
                    break
                except:
                    pass
        
        if readme_content:
            # Extract first meaningful paragraph
            lines = readme_content.split('\n')
            for i, line in enumerate(lines):
                line = line.strip()
                if line and not line.startswith('#') and len(line) > 50:
                    # Get this line and maybe the next one
                    summary = line
                    if i + 1 < len(lines) and len(lines[i + 1].strip()) > 20:
                        summary += " " + lines[i + 1].strip()
                    summary_parts.append(summary)
                    break
        
        # Check for backend folder
        has_backend = any('backend' in str(f).lower() and 'node_modules' not in str(f).lower() for f in files)
        has_frontend = any(f.name in ['vite.config.ts', 'vite.config.js', 'next.config.js', 'package.json'] and not self.should_ignore(str(f)) for f in files)
        
        # Analyze based on stack
        if 'Next.js' in stack:
            summary_parts.append("A Next.js application with React.")
        elif 'React' in stack and 'Vite' in stack:
            summary_parts.append("A React application built with Vite.")
        elif 'React' in stack:
            summary_parts.append("A React application.")
        
        if 'Express.js' in stack and has_backend:
            summary_parts.append("Includes Express.js backend API.")
        
        if 'Vite' in stack or any(f.name == 'vite.config.ts' or f.name == 'vite.config.js' for f in files if not self.should_ignore(str(f))):
            summary_parts.append("Built with Vite for fast development.")
        
        if has_backend and has_frontend:
            summary_parts.append("Full-stack application with separate frontend and backend.")
        elif has_backend:
            summary_parts.append("Backend-focused application.")
        elif has_frontend:
            summary_parts.append("Frontend-focused application.")
        
        if not summary_parts:
            summary_parts.append(f"A {stack[0] if stack else 'code'} project.")
        
        return " ".join(summary_parts)
    
    def identify_key_files(self, files: List[Path]) -> List[str]:
        """Identify the most important files in the project"""
        key_files = []
        priority_files = {
            'README.md': 100,
            'package.json': 90,
            'requirements.txt': 90,
            'docker-compose.yml': 85,
            'Dockerfile': 85,
            'Makefile': 80,
            '.env.example': 80,
            '.env': 75,
            'tsconfig.json': 70,
            'webpack.config.js': 70,
            'next.config.js': 70,
            'vite.config.ts': 70,
            'vite.config.js': 70,
            'manage.py': 70,
            'app.py': 65,
            'main.py': 65,
            'server.js': 65,
            'index.js': 60,
            'server.js': 60,
            'app.js': 60,
            'src/main.js': 55,
            'src/index.js': 55,
            'src/App.js': 50,
        }
        
        for file in files:
            if self.should_ignore(str(file)):
                continue
                
            rel_path = str(file.relative_to(self.project_path)).replace('\\', '/')
            
            # Check if it's a priority file
            if file.name in priority_files:
                key_files.append(rel_path)
            # Check if it's a config file
            elif file.suffix in ['.json', '.yaml', '.yml', '.toml', '.js', '.ts'] and any(word in file.name.lower() for word in ['config', 'setting', 'env']):
                key_files.append(rel_path)
            # Check if it's a main/server file
            elif file.name in ['server.js', 'app.js', 'index.js', 'main.js', 'app.py', 'main.py']:
                key_files.append(rel_path)
        
        # Add up to 5 more important-looking files from backend
        backend_files = [f for f in files if 'backend' in str(f).lower() and 'node_modules' not in str(f).lower()]
        for file in backend_files[:5]:
            rel_path = str(file.relative_to(self.project_path)).replace('\\', '/')
            if rel_path not in key_files:
                key_files.append(rel_path)
        
        # Sort and limit
        key_files.sort()
        return key_files[:20]  # Limit to 20 key files
    
    def scan(self, watch: bool = False) -> ProjectInfo:
        """Main scanning method"""
        print(f"🚀 Starting project analysis: {self.project_path}")
        
        # Perform initial scan
        scan_result = self.scan_directory()
        files = scan_result['files']
        
        # Store file hashes for change detection
        if watch:
            for file in files:
                self.file_hashes[str(file)] = self.get_file_hash(file)
        
        # Detect technology stack
        stack = self.detect_stack(files)
        print(f"🔧 Detected stack: {', '.join(stack)}")
        
        # Analyze architecture
        architecture = self.analyze_architecture(files, stack)
        print(f"🏗️  Architecture: Frontend: {architecture['frontend']}, Backend: {architecture['backend']}")
        
        # Generate summary
        summary = self.generate_summary(files, stack)
        
        # Extract dependencies
        dependencies = self.extract_dependencies(files)
        
        # Detect run commands
        run_commands = self.detect_run_commands(files)
        
        # Identify key files
        key_files = self.identify_key_files(files)
        
        # Collect TODOs and APIs from all files
        all_todos = []
        all_apis = []
        
        print("📄 Analyzing file contents...")
        for i, file in enumerate(files):
            if i % 20 == 0 and i > 0:
                print(f"  Processed {i}/{len(files)} files...")
            
            file_info = self.analyze_file_content(file)
            all_todos.extend(file_info.get('todos', []))
            all_apis.extend(file_info.get('apis', []))
        
        # Prepare project info
        project_info = ProjectInfo()
        project_info.projectName = self.project_name
        project_info.projectSummary = summary
        project_info.detectedStack = stack
        project_info.architecture = architecture
        project_info.keyFiles = key_files
        project_info.dependencies = dependencies
        project_info.howToRun = run_commands
        project_info.APIsDetected = all_apis[:50]  # Limit to 50 APIs
        project_info.unfinishedFeaturesOrTODOs = all_todos[:50]  # Limit to 50 TODOs
        
        # Generate important notes
        notes = []
        if all_todos:
            notes.append(f"Found {len(all_todos)} TODO/FIXME comments in code.")
        
        # Check for backend folder
        backend_files = [f for f in files if 'backend' in str(f).lower() and 'node_modules' not in str(f).lower()]
        if backend_files:
            notes.append(f"Backend folder detected with {len(backend_files)} files.")
        
        # Check for environment files
        env_files = [f for f in files if '.env' in f.name.lower() and not self.should_ignore(str(f))]
        if env_files:
            notes.append(f"Found {len(env_files)} environment configuration files.")
        
        if not run_commands:
            notes.append("No run commands detected. Check README for manual setup.")
        elif len(run_commands) < 3:
            notes.append("Limited run commands detected. May need manual configuration.")
        
        project_info.importantNotesForNextDeveloper = " | ".join(notes) if notes else "No special notes."
        
        print(f"✅ Analysis complete. Found {len(all_apis)} API endpoints and {len(all_todos)} TODOs.")
        return project_info
    
    def has_changes(self) -> bool:
        """Check if any files have changed"""
        for root, dirs, files in os.walk(self.project_path):
            dirs[:] = [d for d in dirs if not self.should_ignore(os.path.join(root, d))]
            
            for file in files:
                filepath = Path(root) / file
                
                if self.should_ignore(str(filepath)):
                    continue
                
                current_hash = self.get_file_hash(filepath)
                file_key = str(filepath)
                
                if file_key in self.file_hashes:
                    if current_hash != self.file_hashes[file_key]:
                        return True
                else:
                    return True
        
        return False
    
    def update_file_hashes(self):
        """Update stored file hashes"""
        for root, dirs, files in os.walk(self.project_path):
            dirs[:] = [d for d in dirs if not self.should_ignore(os.path.join(root, d))]
            
            for file in files:
                filepath = Path(root) / file
                
                if self.should_ignore(str(filepath)):
                    continue
                
                self.file_hashes[str(filepath)] = self.get_file_hash(filepath)
    
    def watch(self, interval: int = 5):
        """Watch for changes and update JSON"""
        print(f"👀 Watching for changes in {self.project_path} (Ctrl+C to stop)")
        print(f"📝 Updates will be saved to project_summary.json")
        
        # Initial scan
        project_info = self.scan(watch=True)
        self.save_json(project_info)
        self.save_markdown(project_info)
        
        last_update = time.time()
        
        try:
            while True:
                time.sleep(interval)
                
                if self.has_changes():
                    print(f"\n🔄 Changes detected at {datetime.datetime.now().strftime('%H:%M:%S')}")
                    project_info = self.scan(watch=True)
                    self.save_json(project_info)
                    self.save_markdown(project_info)
                    last_update = time.time()
                elif time.time() - last_update > 60:
                    # Periodic update every minute even without changes
                    print(f"\n📊 Periodic update at {datetime.datetime.now().strftime('%H:%M:%S')}")
                    project_info = self.scan(watch=True)
                    self.save_json(project_info)
                    self.save_markdown(project_info)
                    last_update = time.time()
                    
        except KeyboardInterrupt:
            print("\n👋 Stopping watcher")
    
    def save_json(self, project_info: ProjectInfo):
        """Save project info to JSON file"""
        output_path = self.project_path / 'project_summary.json'
        
        # Convert to dict
        data = asdict(project_info)
        
        # Add metadata
        data['_metadata'] = {
            'generated_at': datetime.datetime.now().isoformat(),
            'project_path': str(self.project_path),
            'scanner_version': '1.0.0',
            'total_files_scanned': len([f for f in self.project_path.rglob('*') if f.is_file() and not self.should_ignore(str(f))])
        }
        
        # Save to file
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ JSON saved to: {output_path}")
        return output_path
    
    def save_markdown(self, project_info: ProjectInfo):
        """Save project info to Markdown file"""
        output_path = self.project_path / 'PROJECT_GUIDE.md'
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(f"# Project Guide: {project_info.projectName}\n\n")
            f.write(f"*Generated on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n\n")
            
            f.write("## 📋 Summary\n")
            f.write(f"{project_info.projectSummary}\n\n")
            
            f.write("## 🛠️ Technology Stack\n")
            for tech in project_info.detectedStack:
                f.write(f"- {tech}\n")
            f.write("\n")
            
            f.write("## 🏗️ Architecture\n")
            f.write(f"- **Frontend**: {project_info.architecture['frontend']}\n")
            f.write(f"- **Backend**: {project_info.architecture['backend']}\n")
            f.write(f"- **Database**: {project_info.architecture['database']}\n")
            f.write(f"- **Major Directories**: {', '.join(project_info.architecture['majorDirectories'])}\n")
            if project_info.architecture.get('apiDirectories'):
                f.write(f"- **API Directories**: {', '.join(project_info.architecture['apiDirectories'])}\n")
            f.write("\n")
            
            f.write("## 📁 Key Files\n")
            for file in project_info.keyFiles:
                f.write(f"- `{file}`\n")
            f.write("\n")
            
            f.write("## 📦 Dependencies\n")
            for dep in project_info.dependencies:
                f.write(f"- {dep}\n")
            f.write("\n")
            
            f.write("## 🚀 How to Run\n")
            if project_info.howToRun:
                for cmd in project_info.howToRun:
                    if cmd.startswith('#'):
                        f.write(f"{cmd}\n")
                    else:
                        f.write(f"```bash\n{cmd}\n```\n")
            else:
                f.write("No run commands detected. Check the project's documentation.\n")
            f.write("\n")
            
            if project_info.APIsDetected:
                f.write("## 🌐 API Endpoints\n")
                # Group by file
                apis_by_file = {}
                for api in project_info.APIsDetected[:20]:  # Show first 20
                    file = api.get('file', 'unknown')
                    if file not in apis_by_file:
                        apis_by_file[file] = []
                    apis_by_file[file].append(api)
                
                for file, apis in apis_by_file.items():
                    f.write(f"\n### From `{file}`:\n")
                    for api in apis:
                        method = api.get('method', 'GET')
                        path = api.get('path', '')
                        framework = api.get('framework', '')
                        f.write(f"- `{method} {path}`")
                        if framework:
                            f.write(f" ({framework})")
                        f.write("\n")
                
                if len(project_info.APIsDetected) > 20:
                    f.write(f"\n*... and {len(project_info.APIsDetected) - 20} more API endpoints*\n")
                f.write("\n")
            
            if project_info.unfinishedFeaturesOrTODOs:
                f.write("## 🚧 TODO / FIXME Items\n")
                # Group by type
                todos_by_type = {}
                for todo in project_info.unfinishedFeaturesOrTODOs[:20]:  # Show first 20
                    todo_type = todo.get('type', 'TODO')
                    if todo_type not in todos_by_type:
                        todos_by_type[todo_type] = []
                    todos_by_type[todo_type].append(todo)
                
                for todo_type, todos in todos_by_type.items():
                    f.write(f"\n### {todo_type}s:\n")
                    for todo in todos:
                        f.write(f"- **{todo.get('text', '')}**")
                        if todo.get('line'):
                            f.write(f" (line {todo.get('line')})")
                        f.write("\n")
                
                if len(project_info.unfinishedFeaturesOrTODOs) > 20:
                    f.write(f"\n*... and {len(project_info.unfinishedFeaturesOrTODOs) - 20} more items*\n")
                f.write("\n")
            
            f.write("## 💡 Important Notes\n")
            f.write(f"{project_info.importantNotesForNextDeveloper}\n")
        
        print(f"📄 Markdown saved to: {output_path}")
        return output_path

def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Project Auto-Introspector')
    parser.add_argument('path', nargs='?', default='.', help='Path to project directory (default: current directory)')
    parser.add_argument('--watch', '-w', action='store_true', help='Watch for changes and auto-update')
    parser.add_argument('--interval', '-i', type=int, default=5, help='Watch interval in seconds (default: 5)')
    parser.add_argument('--json-only', action='store_true', help='Generate JSON only (no markdown)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed progress')
    
    args = parser.parse_args()
    
    # Validate path
    project_path = Path(args.path).resolve()
    if not project_path.exists():
        print(f"❌ Error: Path '{project_path}' does not exist")
        sys.exit(1)
    
    if not project_path.is_dir():
        print(f"❌ Error: '{project_path}' is not a directory")
        sys.exit(1)
    
    # Create scanner
    scanner = ProjectScanner(project_path)
    
    if args.watch:
        # Run in watch mode
        scanner.watch(interval=args.interval)
    else:
        # Run once
        project_info = scanner.scan()
        json_path = scanner.save_json(project_info)
        
        if not args.json_only:
            md_path = scanner.save_markdown(project_info)
            print(f"\n📊 Analysis complete!")
            print(f"📄 JSON: {json_path}")
            print(f"📘 Markdown: {md_path}")

if __name__ == '__main__':
    main()