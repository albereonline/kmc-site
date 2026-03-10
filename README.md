# KMC Agency Website

## Deploy to Vercel (free, ~5 minutes)

### Step 1: Upload to GitHub
1. Go to [github.com/new](https://github.com/new)
2. Name the repo `kmc-site`
3. Keep it **Public** or **Private** — both work
4. Click **"Create repository"**
5. On the next page, click **"uploading an existing file"**
6. Drag and drop ALL the files from this folder into the upload area
7. Click **"Commit changes"**

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New → Project"**
3. Find your `kmc-site` repo and click **"Import"**
4. Leave all settings as default (Vercel auto-detects Vite)
5. Click **"Deploy"**
6. Wait ~60 seconds — your site is live!

## Local Development
```bash
npm install
npm run dev
```
Opens at http://localhost:5173

## Edit Content
All content is in `src/App.jsx` — just edit the text/data arrays at the top of the file.