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
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to InfinityFree

1. Build the site (this will create an `htdocs` folder ready for upload):
   `npm run build` or `npm run build:infinityfree`

2. Create a ZIP of the `htdocs` contents (PowerShell example):

```powershell
Compress-Archive -Path .\htdocs\* -DestinationPath .\deploy.zip
```

3. In InfinityFree control panel, upload the ZIP to the account's `htdocs` (or use FTP) and extract, or upload files directly so that `index.html` is in the site root.

4. Ensure `.htaccess` is present in the site root (it is included in the build here) so client-side routing falls back to `index.html`.

Notes:

- The Vite config uses `base: './'` to keep asset paths relative so the site works from the hosting root.
- If your InfinityFree account uses a different document root (like `public_html`), upload the built files there instead.
