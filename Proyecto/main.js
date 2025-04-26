document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('noteForm');
  const listNotesBtn = document.getElementById('listNotes');
  const deleteNoteBtn = document.getElementById('deleteNote');
  const notesList = document.getElementById('notesList');
  document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
  
    try {
      await window.electronAPI.createNote({ title, content });
      alert('Nota creada con éxito!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
  // Cargar notas al iniciar
  listNotes();

  // Manejar formulario
  noteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('noteTitle').value.trim();
      const content = document.getElementById('noteContent').value.trim();
      
      if (!title || !content) {
          alert('Título y contenido son requeridos');
          return;
      }

      try {
          await window.electron.createNote({ title, content });
          noteForm.reset();
          await listNotes();
      } catch (error) {
          alert(error.message);
      }
  });

  // Botón listar notas
  listNotesBtn.addEventListener('click', listNotes);

  // Botón eliminar nota
  deleteNoteBtn.addEventListener('click', async () => {
      const title = document.getElementById('deleteTitle').value.trim();
      if (!title) {
          alert('Ingrese un título para eliminar');
          return;
      }

      if (confirm(`¿Eliminar la nota "${title}"?`)) {
          try {
              await window.electron.deleteNote(title);
              document.getElementById('deleteTitle').value = '';
              await listNotes();
          } catch (error) {
              alert(error.message);
          }
      }
  });

  // Función para mostrar notas
  async function listNotes() {
      try {
          const notes = await window.electron.listNotes();
          displayNotes(notes);
      } catch (error) {
          console.error('Error al listar notas:', error);
          notesList.innerHTML = '<p class="error">Error al cargar notas</p>';
      }
  }

  // Mostrar notas en el HTML
  function displayNotes(notes) {
      if (!notes || notes.length === 0) {
          notesList.innerHTML = '<p class="empty">No hay notas disponibles</p>';
          return;
      }

      notesList.innerHTML = notes.map(note => `
          <div class="note">
              <h3>${note.titulo}</h3>
              <p>${note.contenido}</p>
              <p class="date">${formatDate(note.fechaCreacion)}</p>
          </div>
      `).join('');
  }

  // Formatear fecha
  function formatDate(isoString) {
      const date = new Date(isoString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
});