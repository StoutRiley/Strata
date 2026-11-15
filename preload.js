const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  folder: () => ipcRenderer.invoke('folder:get'),
  choose: () => ipcRenderer.invoke('folder:choose'),
  load: () => ipcRenderer.invoke('data:load'),
  save: d => ipcRenderer.invoke('data:save', d)
});
