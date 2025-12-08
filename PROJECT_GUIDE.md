# Project Guide: jifywigs

*Generated on 2025-12-08 19:46:09*

## 📋 Summary
A modern e-commerce platform with services booking system. A Next.js application with React. Frontend-focused application.

## 🛠️ Technology Stack
- Express.js
- Firebase
- MongoDB
- Next.js
- Node.js
- React
- Redis
- Tailwind CSS
- TypeScript

## 🏗️ Architecture
- **Frontend**: client
- **Backend**: server
- **Database**: MongoDB
- **Major Directories**: client, docs, scripts, server, shared
- **API Directories**: client, docs, server

## 📁 Key Files
- `README.md`
- `client/.next/package.json`
- `client/.next/static/chunks/fallback/main.js`
- `client/.next/types/package.json`
- `client/next-env.d.ts`
- `client/next.config.js`
- `client/package.json`
- `client/postcss.config.js`
- `client/tailwind.config.ts`
- `client/tsconfig.json`
- `package.json`
- `server/package.json`
- `server/tsconfig.json`
- `shared/package.json`
- `shared/tsconfig.json`

## 📦 Dependencies
- @headlessui/react (client/package.json) (prod)
- @heroicons/react (client/package.json) (prod)
- @hookform/resolvers (client/package.json) (prod)
- @jifywigs/shared (client/package.json) (prod)
- @sendgrid/mail (server/package.json) (prod)
- @tanstack/react-query (client/package.json) (prod)
- @types/bcryptjs (server/package.json) (prod)
- @types/compression (server/package.json) (prod)
- @types/cors (server/package.json) (prod)
- @types/express (server/package.json) (prod)
- @types/geoip-lite (server/package.json) (prod)
- @types/helmet (server/package.json) (prod)
- @types/jsonwebtoken (server/package.json) (prod)
- @types/mongoose (shared/package.json) (dev)
- @types/morgan (server/package.json) (prod)
- @types/multer (server/package.json) (prod)
- @types/node (client/package.json) (dev)
- @types/node (server/package.json) (prod)
- @types/node (shared/package.json) (dev)
- @types/react (client/package.json) (dev)
- @types/react-datepicker (client/package.json) (prod)
- @types/react-dom (client/package.json) (dev)
- @types/react-dropzone (client/package.json) (dev)
- @types/ua-parser-js (server/package.json) (prod)
- @types/uuid (server/package.json) (prod)
- @types/validator (server/package.json) (prod)
- @typescript-eslint/eslint-plugin (client/package.json) (dev)
- @typescript-eslint/eslint-plugin (server/package.json) (dev)
- @typescript-eslint/parser (client/package.json) (dev)
- @typescript-eslint/parser (server/package.json) (dev)
- autoprefixer (client/package.json) (dev)
- axios (client/package.json) (prod)
- axios (server/package.json) (prod)
- bcryptjs (server/package.json) (prod)
- bull (server/package.json) (prod)
- class-variance-authority (client/package.json) (prod)
- cloudinary (server/package.json) (prod)
- clsx (client/package.json) (prod)
- compression (server/package.json) (prod)
- cors (server/package.json) (prod)
- date-fns (client/package.json) (prod)
- dotenv (server/package.json) (prod)
- eslint (client/package.json) (dev)
- eslint (server/package.json) (dev)
- eslint-config-next (client/package.json) (dev)
- express (server/package.json) (prod)
- express-rate-limit (server/package.json) (prod)
- express-validator (server/package.json) (prod)
- firebase (client/package.json) (prod)
- framer-motion (client/package.json) (prod)
- geoip-lite (server/package.json) (prod)
- google-auth-library (server/package.json) (prod)
- helmet (server/package.json) (prod)
- jose (client/package.json) (prod)
- js-cookie (client/package.json) (prod)
- jsonwebtoken (server/package.json) (prod)
- lucide (client/package.json) (prod)
- lucide-react (client/package.json) (prod)
- mongoose (server/package.json) (prod)
- mongoose (shared/package.json) (prod)
- morgan (server/package.json) (prod)
- multer (server/package.json) (prod)
- next (client/package.json) (prod)
- next-themes (client/package.json) (prod)
- nodemailer (server/package.json) (prod)
- nodemon (server/package.json) (dev)
- pdfkit (server/package.json) (prod)
- postcss (client/package.json) (dev)
- rate-limiter-flexible (server/package.json) (prod)
- react (client/package.json) (prod)
- react-datepicker (client/package.json) (prod)
- react-dom (client/package.json) (prod)
- react-dropzone (client/package.json) (prod)
- react-hook-form (client/package.json) (prod)
- react-hot-toast (client/package.json) (prod)
- react-icons (client/package.json) (prod)
- redis (server/package.json) (prod)
- rimraf (server/package.json) (dev)
- rimraf (shared/package.json) (dev)
- sharp (server/package.json) (prod)
- stripe (server/package.json) (prod)
- swr (client/package.json) (prod)
- tailwind-merge (client/package.json) (prod)
- tailwindcss (client/package.json) (dev)
- ts-node (server/package.json) (dev)
- tsconfig-paths (server/package.json) (dev)
- typescript (client/package.json) (dev)
- typescript (server/package.json) (dev)
- typescript (shared/package.json) (dev)
- ua-parser-js (server/package.json) (prod)
- uuid (server/package.json) (prod)
- validator (server/package.json) (prod)
- winston (server/package.json) (prod)
- zod (client/package.json) (prod)
- zustand (client/package.json) (prod)

## 🚀 How to Run
```bash
cd client && npm run dev # next dev
```
```bash
cd client && npm run build # next build
```
```bash
cd client && npm run start # next start
```
```bash
cd server && npm run start # node dist/server.js
```
```bash
cd server && npm run dev # nodemon src/server.ts
```
```bash
cd server && npm run build # tsc
```
```bash
cd server && npm run prebuild # npm run clean
```
```bash
cd server && npm run clean # rimraf dist
```
```bash
cd server && npm run render-build # npm install --include=dev && cd ../shared && npm install --include=dev && npm run build && cd ../server && npm run build
```
```bash
cd shared && npm run build # tsc
```

## 🌐 API Endpoints

### From `server/src/app.ts`:
- `GET /health` (Express.js)

### From `server/src/server.ts`:
- `GET /api/health` (Express.js)
- `GET /` (Express.js)

### From `server/src/routes/admin.routes.ts`:
- `GET /analytics` (Express.js)
- `GET /analytics/export` (Express.js)

### From `server/src/routes/auth.routes.ts`:
- `POST /register` (Express.js)
- `POST /login` (Express.js)
- `POST /google` (Express.js)
- `POST /forgot-password` (Express.js)
- `POST /reset-password` (Express.js)
- `POST /logout` (Express.js)
- `GET /me` (Express.js)

### From `server/src/routes/order.routes.ts`:
- `POST /` (Express.js)
- `GET /me` (Express.js)
- `PATCH /:id/status` (Express.js)

### From `server/src/routes/products.ts`:
- `GET /` (Express.js)
- `GET /:id` (Express.js)
- `POST /` (Express.js)
- `PUT /:id` (Express.js)
- `DELETE /:id` (Express.js)

*... and 4 more API endpoints*


## 💡 Important Notes
Found 65 TODO/FIXME comments in code.
