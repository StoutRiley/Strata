# Strata (Weekly Goals)

Desktop app for Windows **and** a mobile-friendly web app that runs in any phone browser.

## Desktop (Windows installer)

1. Create a new GitHub repository (public is fine: it contains only this app's code, none of your data).
2. Upload everything in this folder, including the hidden `.github` folder, to the repository.
3. Open the Actions tab > "Build Windows installer" > Run workflow.
4. After about 5 minutes, open the finished run and download "WeeklyGoals-Setup". Unzip it to get `Weekly Goals Setup 1.0.0.exe`.
   (For a permanent public download link, tag a release such as `v1.0.0`; the installer is attached to the Releases page.)

### Install
Run the setup file, pick an install location, and finish. On first launch, choose the folder where your data will be saved.

### Windows security warning
Windows may show "Windows protected your PC" because the installer is not signed with a paid certificate. Since you built it from code in your own repository, click More info > Run anyway.

### Your data (desktop)
Saved as `weekly-goals-data.json` in the folder you chose, with a `.bak.json` copy of the previous session. To back up or move to another computer, copy that file. If you choose a OneDrive folder, OneDrive will sync the file for you.

---

## Phone / any browser (no install required)

Open `app/index.html` in a browser, or host the `app/` folder on any static site (GitHub Pages, Netlify, a simple local server, etc.).

On a phone:

1. Open the page in Safari (iOS) or Chrome (Android).
2. Use **Add to Home Screen** / **Install app** so it opens full-screen like a native app.
3. Data is stored in the browser (localStorage). Use **My Account → Export backup** to keep a JSON file you can import later or on another device.

The same UI adapts to small screens: larger touch targets, compact navigation, and safe-area padding for notches.

### Quick local preview
From the project root:

```bash
npx --yes serve app
```

Then open the URL on your phone (same Wi‑Fi) or in a desktop browser’s mobile emulator.

---

## Development

```bash
npm install
npm start          # Electron desktop
```

The HTML is self-contained: when `window.api` from Electron is missing, it automatically uses browser storage so one codebase works on desktop and phone.
