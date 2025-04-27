function buscarPareja() {
    // Obtener la lista de invitados del input
    const inputInvitados = document.getElementById('invitados').value;
    const resultadoDiv = document.getElementById('resultado');
    
    // Limpiar resultado anterior
    resultadoDiv.innerHTML = '';
    resultadoDiv.className = 'resultado';
    
    // Validar que se haya ingresado algo
    if (!inputInvitados.trim()) {
        resultadoDiv.textContent = 'Por favor ingresa la lista de invitados';
        resultadoDiv.classList.add('no-encontrado');
        return;
    }
    
    // Procesar la lista de invitados
    const listaInvitados = inputInvitados.split(',')
        .map(nombre => nombre.trim())
        .filter(nombre => nombre.length > 0)
        .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
    
    // Validar que haya al menos 2 invitados
    if (listaInvitados.length < 2) {
        resultadoDiv.textContent = 'Se necesitan al menos 2 invitados para buscar parejas';
        resultadoDiv.classList.add('no-encontrado');
        return;
    }
    
    // Aplicar el algoritmo de los dos punteros
    const pareja = encontrarParejaConDosPunteros(listaInvitados);
    
    // Mostrar resultados
    if (pareja) {
        resultadoDiv.innerHTML = `<strong>Pareja encontrada:</strong> ${pareja[0]} y ${pareja[1]} (ambos comienzan con '${pareja[0][0].toUpperCase()}')`;
        resultadoDiv.classList.add('encontrado');
    } else {
        resultadoDiv.textContent = 'No se encontró ningún par de invitados consecutivos con la misma letra inicial';
        resultadoDiv.classList.add('no-encontrado');
    }
}

function encontrarParejaConDosPunteros(lista) {
    // Inicializar los punteros
    let punteroIzq = 0;
    let punteroDer = 1;
    
    // Recorrer la lista con los dos punteros
    while (punteroDer < lista.length) {
        const nombre1 = lista[punteroIzq];
        const nombre2 = lista[punteroDer];
        
        // Obtener la primera letra de cada nombre (ignorando mayúsculas/minúsculas)
        const letra1 = nombre1[0].toUpperCase();
        const letra2 = nombre2[0].toUpperCase();
        
        // Si las letras coinciden, retornar la pareja
        if (letra1 === letra2) {
            return [nombre1, nombre2];
        }
        
        // Mover ambos punteros
        punteroIzq++;
        punteroDer++;
    }
    
    // Si no se encontró ninguna pareja
    return null;
}

// Ejemplo de uso automático al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('invitados').value = 'Ana, Carlos, Alberto, Carmen, David, Daniel, Elena, Esteban';
});