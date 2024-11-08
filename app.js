// Agregar tarea
const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;
    if (descripcion.trim() === '') {
      alert('Por favor, ingresa una descripción para la tarea');
      return;
    }
  
    const response = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion }),
    });
  
    const tarea = await response.json();
    agregarTareaALista(tarea);
    document.querySelector('#nuevaTarea').value = ''; // Limpiar el campo de entrada
  };
  
  // Obtener tareas al cargar la página
  const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTareaALista(tarea));
  };
  
  // Eliminar tarea
  const eliminarTarea = async (id) => {
    await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' });
    document.getElementById(`tarea-${id}`).remove();
  };
  
  // Agregar tarea a la lista en la interfaz
  const agregarTareaALista = (tarea) => {
    const listaTareas = document.getElementById('listaTareas');
    const li = document.createElement('li');
    li.id = `tarea-${tarea.id}`;
    li.innerHTML = `
      ${tarea.descripcion}
      <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
    `;
    listaTareas.appendChild(li);
  };
  
  document.addEventListener('DOMContentLoaded', obtenerTareas);
  