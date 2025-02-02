// Obtenemos los elementos del DOM
// Obtenemos los elementos del DOM
const inputName = document.getElementById('amigo');
const buttonAdd = document.querySelector('.button-add');
const buttonSortear = document.querySelector('.button-draw');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Creamos una variable para almacenar los nombres
let amigos = [];

// Función para agregar un nombre
function agregarAmigo() {
    const nombre = inputName.value.trim();

    // Validamos que el nombre no esté vacío ni tenga caracteres no alfabéticos
    if (nombre === "" || !/^[a-zA-Z]+$/.test(nombre)) {
        alert("El nombre debe contener solo letras, sin espacios ni caracteres especiales.");
        inputName.value = "";
        inputName.focus();
        return;
    }

    // Verificamos que no hayamos agregado más de 5 nombres
    if (amigos.length < 5) {
        // Agregamos el nombre al array
        amigos.push(nombre);

        // Actualizamos la lista visualmente
        actualizarLista();

        // Limpiamos el input para permitir ingresar otro nombre
        inputName.value = "";
        inputName.focus();

        // Habilitamos o deshabilitamos el botón dependiendo del número de amigos registrados
        if (amigos.length === 5) {
            inputName.disabled = true; // Deshabilitamos el campo de texto cuando llegamos al máximo
            buttonAdd.disabled = true; // Deshabilitamos el botón de añadir cuando llegamos al máximo
        }

        // Actualizamos el contenido de la sección
        actualizarSeccion();
    }
}

// Función para actualizar la lista de amigos en la pantalla
function actualizarLista() {
    // Limpiamos la lista actual
    listaAmigos.innerHTML = '';

    // Recorremos el array de amigos y los mostramos en la lista
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para actualizar la sección de resultados y habilitar/deshabilitar botones
function actualizarSeccion() {
    // Actualizamos el mensaje que muestra cuántos amigos faltan por registrar
    if (amigos.length === 0) {
        inputName.placeholder = "Debes registrar 5 amigos para iniciar el sorteo";
    } else {
        inputName.placeholder = `${amigos[amigos.length - 1]} registrado, te falta registrar ${5 - amigos.length} amigos`;
    }

    // Verificamos si la lista de amigos tiene 5 elementos
    if (amigos.length === 5) {
        buttonSortear.disabled = false; // Habilitamos el botón de sortear cuando tenemos 5 amigos
        resultado.innerHTML = `<p>Has registrado todos los amigos. ¡Ya puedes hacer el sorteo!</p>`;
    } else {
        buttonSortear.disabled = true; // Deshabilitamos el botón de sortear si no hay 5 amigos
    }

    // Actualizamos el contenido de la lista
    resultado.innerHTML = `<p>Has registrado ${amigos.length} ${amigos.length === 1 ? 'amigo' : 'amigos'}.</p>`;
}

// Función para realizar el sorteo de manera aleatoria
function sortearAmigo() {
    if (amigos.length === 5) {
        // Seleccionamos un amigo aleatorio de la lista
        const ganador = amigos[Math.floor(Math.random() * amigos.length)];

        // Mostramos al ganador
        resultado.innerHTML = `<p>¡El amigo secreto es: <strong>${ganador}</strong>!</p>`;
    } else {
        alert("Debes registrar 5 amigos antes de hacer el sorteo.");
    }
}

// Agregar evento al campo input para habilitar el botón cuando se escriba un nombre
inputName.addEventListener('input', () => {
    if (inputName.value.trim() !== "") {
        buttonAdd.disabled = false; // Habilitamos el botón si hay algo escrito
    } else {
        buttonAdd.disabled = true; // Deshabilitamos el botón si no hay texto
    }
});


