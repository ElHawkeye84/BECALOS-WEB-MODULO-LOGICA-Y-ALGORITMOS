const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

// Ruta corregida para el archivo de notas
const NOTES_FILE = path.join(app.getPath('userData'), 'notas.json');

// Función mejorada para inicializar el archivo
function inicializarArchivoNotas() {
  try {
    if (!fs.existsSync(NOTES_FILE)) {
      fs.writeFileSync(NOTES_FILE, '[]', 'utf8');
    }
    return true;
  } catch (error) {
    console.error('Error al inicializar archivo:', error);
    return false;
  }
}

// Función mejorada para leer notas
function leerNotas() {
  try {
    if (!fs.existsSync(NOTES_FILE)) inicializarArchivoNotas();
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo notas:', error);
    return [];
  }
}

// Función mejorada para guardar notas
function guardarNotas(notas) {
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notas, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error guardando notas:', error);
    return false;
  }
}

// Crear ventana de Electron
function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  win.loadFile('index.html');
  // win.webContents.openDevTools(); // Descomenta para debug
}

// Inicialización mejorada
app.whenReady().then(() => {
  if (!inicializarArchivoNotas()) {
    console.error('No se pudo inicializar el archivo de notas');
    app.quit();
    return;
  }

  createWindow();

  // Comunicación IPC mejorada
  ipcMain.handle('create-note', async (_, { title, content }) => {
    const notas = leerNotas();
    
    if (notas.some(note => note.titulo.toLowerCase() === title.toLowerCase())) {
      throw new Error('Ya existe una nota con ese título');
    }
    
    const nuevaNota = {
      titulo: title,
      contenido: content,
      fechaCreacion: new Date().toISOString()
    };
    
    notas.push(nuevaNota);
    if (!guardarNotas(notas)) {
      throw new Error('Error al guardar la nota');
    }
    return nuevaNota;
  });

  ipcMain.handle('list-notes', () => {
    return leerNotas();
  });

  ipcMain.handle('delete-note', (_, title) => {
    let notas = leerNotas();
    const initialLength = notas.length;
    
    notas = notas.filter(note => note.titulo.toLowerCase() !== title.toLowerCase());
    
    if (notas.length === initialLength) {
      throw new Error('No se encontró la nota');
    }
    
    if (!guardarNotas(notas)) {
      throw new Error('Error al eliminar la nota');
    }
    return true;
  });
});

// Manejo de cierre
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});