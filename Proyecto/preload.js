const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createNote: (note) => ipcRenderer.invoke('create-note', note),
  listNotes: () => ipcRenderer.invoke('list-notes'),
  deleteNote: (title) => ipcRenderer.invoke('delete-note', title)
});