Amigo Secreto - Sorteo Aleatorio
Este proyecto permite realizar un sorteo de "Amigo Secreto" en el que los usuarios registran hasta 5 amigos y, una vez registrados, pueden hacer un sorteo aleatorio para asignar a cada amigo su "Amigo Secreto". Se valida que los nombres ingresados solo contengan letras (sin espacios ni caracteres especiales).

Características
Los usuarios pueden agregar hasta 5 amigos.
El nombre de cada amigo debe estar compuesto únicamente por letras (mayúsculas o minúsculas).
Si se intenta ingresar un nombre vacío o con caracteres no válidos (espacios, símbolos especiales, etc.), se muestra una alerta.
Una vez que los 5 amigos están registrados, se habilita un botón para realizar el sorteo de forma aleatoria.
El nombre del ganador se muestra después de realizar el sorteo.
Tecnologías Usadas
HTML: Para la estructura de la página.
CSS: Para los estilos (no se proporciona en este código, pero se pueden personalizar los estilos).
JavaScript: Para la lógica del sorteo y la validación de los nombres ingresados.
Cómo Funciona
Ingreso de Amigos:

El usuario debe ingresar un nombre en el campo de texto.
El botón "Añadir" se habilita cuando el campo de texto tiene un valor válido.
El nombre ingresado se agrega a la lista de amigos y se muestra en la interfaz.
Validación del Nombre:

Solo se permiten nombres que contengan letras (mayúsculas o minúsculas). Si se intenta ingresar un nombre vacío o con caracteres no alfabéticos, se muestra una alerta.
El campo de texto se limpia y el foco se posiciona nuevamente en el campo para que el usuario intente nuevamente.
Sorteo:

Una vez que se hayan registrado los 5 amigos, el botón "Sortear amigo" se habilita.
Al hacer clic en el botón "Sortear amigo", se selecciona aleatoriamente un nombre de la lista y se muestra el nombre del ganador.
Cómo Usar
Clonación del Proyecto: Si deseas utilizar este código en tu proyecto, simplemente clona este repositorio o copia el código en tus archivos locales. Asegúrate de tener los siguientes archivos:

index.html (HTML)
app.js (JavaScript)
Pasos a seguir:

Abre el archivo index.html en tu navegador.
Ingresa los nombres de tus amigos en el campo de texto (máximo 5 amigos).
Una vez que todos los amigos estén registrados, haz clic en el botón "Sortear amigo" para ver el ganador.
Requisitos:

No necesitas servidores especiales, ya que el código funciona de manera local en el navegador.
Estructura del Proyecto
plaintext
Copiar
├── index.html   # Estructura de la página HTML
├── app.js       # Lógica JavaScript para el sorteo
└── style.css    # Archivo de estilos CSS (opcional, no se proporciona aquí)
Funcionalidades del Código
1. Agregar Amigos
Validación: Solo se permiten letras (sin espacios ni caracteres especiales).
Máximo de 5 amigos: El sistema solo permite agregar hasta 5 nombres.
2. Sorteo Aleatorio
Selección Aleatoria: El sistema selecciona un nombre de manera aleatoria entre los 5 amigos registrados.
Mensaje de Resultado: Muestra el nombre del ganador en la interfaz.
3. Interfaz de Usuario
El campo de texto muestra mensajes de alerta si el nombre no es válido.
El botón "Sortear amigo" está deshabilitado hasta que se hayan registrado los 5 amigos.
Código JavaScript
A continuación, se proporciona el código JavaScript que maneja la lógica de registro y sorteo de los amigos:

javascript
Copiar
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
