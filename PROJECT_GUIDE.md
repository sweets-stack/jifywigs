# Project Guide: jifywigs

*Generated on 2025-12-01 17:00:07*

## 📋 Summary
A modern e-commerce platform with services booking system. A Next.js application with React. Frontend-focused application.

## 🛠️ Technology Stack
- Express.js
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
- **API Directories**: client, docs

## 📁 Key Files
- `README.md`
- `client/next.config.js`
- `client/package.json`
- `client/postcss.config.js`
- `client/tailwind.config.ts`
- `client/tsconfig.json`
- `package.json`
- `server/package.json`
- `server/tsconfig.json`

## 📦 Dependencies
- @heroicons/react (client/package.json) (prod)
- @hookform/resolvers (client/package.json) (prod)
- @sendgrid/mail (server/package.json) (prod)
- @tanstack/react-query (client/package.json) (prod)
- @types/bcryptjs (server/package.json) (dev)
- @types/compression (server/package.json) (dev)
- @types/cors (server/package.json) (dev)
- @types/express (server/package.json) (dev)
- @types/geoip-lite (server/package.json) (dev)
- @types/jsonwebtoken (server/package.json) (dev)
- @types/multer (server/package.json) (dev)
- @types/node (client/package.json) (dev)
- @types/node (server/package.json) (dev)
- @types/react (client/package.json) (dev)
- @types/react-dom (client/package.json) (dev)
- @types/ua-parser-js (server/package.json) (dev)
- @types/validator (server/package.json) (dev)
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
- concurrently (package.json) (dev)
- cors (server/package.json) (prod)
- date-fns (client/package.json) (prod)
- dotenv (server/package.json) (prod)
- eslint (client/package.json) (dev)
- eslint (server/package.json) (dev)
- eslint-config-next (client/package.json) (dev)
- express (server/package.json) (prod)
- express-rate-limit (server/package.json) (prod)
- express-validator (server/package.json) (prod)
- framer-motion (client/package.json) (prod)
- geoip-lite (server/package.json) (prod)
- helmet (server/package.json) (prod)
- js-cookie (client/package.json) (prod)
- jsonwebtoken (server/package.json) (prod)
- lucide-react (client/package.json) (prod)
- mongoose (server/package.json) (prod)
- multer (server/package.json) (prod)
- next (client/package.json) (prod)
- next-themes (client/package.json) (prod)
- nodemailer (server/package.json) (prod)
- nodemon (server/package.json) (dev)
- paystack (server/package.json) (prod)
- pdfkit (server/package.json) (prod)
- postcss (client/package.json) (dev)
- prettier (package.json) (dev)
- rate-limiter-flexible (server/package.json) (prod)
- react (client/package.json) (prod)
- react-dom (client/package.json) (prod)
- react-hook-form (client/package.json) (prod)
- react-hot-toast (client/package.json) (prod)
- redis (server/package.json) (prod)
- sharp (server/package.json) (prod)
- stripe (server/package.json) (prod)
- swr (client/package.json) (prod)
- tailwind-merge (client/package.json) (prod)
- tailwindcss (client/package.json) (dev)
- ts-node (server/package.json) (dev)
- typescript (client/package.json) (dev)
- typescript (server/package.json) (dev)
- ua-parser-js (server/package.json) (prod)
- validator (server/package.json) (prod)
- winston (server/package.json) (prod)
- zod (client/package.json) (prod)
- zustand (client/package.json) (prod)

## 🚀 How to Run
```bash
npm run dev # concurrently "npm run dev:client" "npm run dev:server"
```
```bash
npm run dev:client # cd client && npm run dev
```
```bash
npm run dev:server # cd server && npm run dev
```
```bash
npm run build # npm run build:client && npm run build:server
```
```bash
npm run build:client # cd client && npm run build
```
```bash
npm run build:server # cd server && npm run build
```
```bash
npm run start # concurrently "npm run start:client" "npm run start:server"
```
```bash
npm run start:client # cd client && npm start
```
```bash
npm run start:server # cd server && npm start
```
```bash
npm run format # prettier --write "**/*.{ts,tsx,js,jsx,json,md}"
```

## 🌐 API Endpoints

### From `server/src/routes/admin.routes.ts`:
- `GET /analytics` (Express.js)
- `GET /analytics/export` (Express.js)

### From `server/src/routes/webhook.routes.ts`:
- `POST /paystack` (Express.js)
- `POST /stripe` (Express.js)

## 💡 Important Notes
No special notes.
