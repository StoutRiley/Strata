const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path'), fs = require('fs');

const cfgPath = () => path.join(app.getPath('userData'), 'config.json');
function cfg() { try { return JSON.parse(fs.readFileSync(cfgPath(), 'utf8')); } catch (e) { return {}; } }
function dataPath() { const f = cfg().folder; return f ? path.join(f, 'weekly-goals-data.json') : null; }

let win, backedUp = false;

function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1000, height: 820, minWidth: 360, title: 'Weekly Goals',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  // The app loads only its own local file. Block everything else.
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', e => e.preventDefault());
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => {
    ipcMain.handle('folder:get', () => { const f = cfg().folder; return f && fs.existsSync(f) ? f : null; });
    ipcMain.handle('folder:choose', async () => {
      const r = await dialog.showOpenDialog(win, { title: 'Choose a folder for your data', properties: ['openDirectory', 'createDirectory'] });
      if (r.canceled || !r.filePaths[0]) return null;
      fs.writeFileSync(cfgPath(), JSON.stringify({ folder: r.filePaths[0] }));
      return r.filePaths[0];
    });
    // Throws on a read error so the app never overwrites data it could not read.
    ipcMain.handle('data:load', () => { const p = dataPath(); return p && fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; });
    ipcMain.handle('data:save', (e, text) => {
      const p = dataPath();
      if (!p || typeof text !== 'string' || text.length > 5e6) return false;
      try {
        if (!backedUp && fs.existsSync(p)) { fs.copyFileSync(p, p.replace(/\.json$/, '.bak.json')); backedUp = true; }
        const t = p + '.tmp'; fs.writeFileSync(t, text); fs.renameSync(t, p);
        return true;
      } catch (err) { return false; }
    });
    createWindow();
  });
  app.on('window-all-closed', () => app.quit());
}
