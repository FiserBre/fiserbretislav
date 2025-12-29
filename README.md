<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1F2hZAp9YCuqLM9jrYl8LkwQwhHZzFhOq

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. For local development set the `GEMINI_API_KEY` in `.env.local` (do NOT commit this file).
   For Vercel deployment, add the environment variable `API_KEY` in the Vercel Project Settings (Environment Variables).
3. Run the app locally:
   `npm run dev`

## Deploy to Vercel

1. Create a new Vercel project and connect this repository.
2. Set the Environment Variable `API_KEY` (key name: `API_KEY`) in the Vercel Project Settings.
3. Vercel Build Settings (automatic with `vercel.json`):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy — Vercel will run the build and publish the `dist` folder. SPA routing is configured in `vercel.json`.

If you still need the legacy InfinityFree workflow, keep the `build:infinityfree` script; otherwise you can remove the `htdocs` folder and related artifacts.
