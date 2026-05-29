# MyPortfolio

Personal portfolio built with Next.js, React, and Framer Motion.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Run & Development

Use these commands in your project root (PowerShell recommended on Windows):

```bash
# Install dependencies
npm install

# Run development server (default)
npm run dev

# Run dev on specific port (PowerShell)
$env:PORT=3000; npm run dev

# Run dev on specific port (CMD)
set PORT=3000&& npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Build & start
npm run build && npm run start

# Run linter
npm run lint

# Network/debug helpers
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Open the site in the default browser (PowerShell)
start http://localhost:3000
```

## Deployment

This app can be deployed to any platform that supports Node.js builds, including Vercel.

