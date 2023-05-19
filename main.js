
let events = []; // aqui voy a guardar toda la informacion de mis eventos 
let arr = []; // cargar informacion

const eventName = document.querySelector('#eventName'); // aqui conecto las referencias de los inputs y los buttons
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector('#eventsContainer');

const json = load(); // almaceno lo que tenga guardado en la const json

try { // aqui evaluamos
    arr = JSON.parse(json); // osea voy a guardar la informacion de mi arreglo como si fuera un objeto JSON en texto
} catch (error) {           // y cada vez que entre a mi aplicacion voy a recuperar la informcion con la funcion load()
    arr = [];                        // y la parseo para volver a transformarla en un arreglo 
}                           // si esto sucede se lo voy a asignar a arreglo y si no hay nada devuelve undefined

events = arr ? [...arr] : []; // evaluamos si arreglo existe copia lo que tengo en el arreglo o sino eventos es un arreglo vacio

renderEvents(); // esta funcion dibuja la informacion guardada

document.querySelector('form').addEventListener('submit', e =>{
    e.preventDefault();
    addEvent(); // este metodo todavia no existe
});

buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addEvent(); // este metodo todavia no existe
});

function addEvent(){
    if(eventName.value === '' || eventDate.value === ''){
        return;
    }

    if(dateDiff(eventDate.value) < 0){ // si la diferencia de la fecha actual a la fecha del evento es negativa 
        return;                        // no agregues nada, quiero que termines la funcion/ no se ha creado
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value
    };

    events.unshift(newEvent); // agregamos un elemento al inicio del arreglo

    save(JSON.stringify(events)); // aca se esta guardando en local storage

    eventName.value = '';

    renderEvents(); // esta funcion no se ha creado 

}


function dateDiff(d){
    const targetDate = new Date(d);
    const today = new Date();
    const difference = targetDate.getTime() - today.getTime(); // regresa un numero pero no me dice cuantos dias 
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function renderEvents(){
    const eventsHTML = events.map(event =>{ // event es un objeto con 3 propiedades
        return `
        <div class="event">
            <div class="days">
                <span class="days-number">${dateDiff(event.date)}</span> 
                <span class="days-text">days</span>
            </div>

            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions">
                <button class="bDelete" data-id="${event.id}">Eliminar</button>
            </div>
        </div>
        `;

    });
    eventsContainer.innerHTML = eventsHTML.join('')// aca eventsHTML es un arreglo y se unen en un string vacio 
    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            events = events.filter(event => event.id !== id) // voy a filtrar para obtener todo los elementos id que sean distintos al id que estoy obteniendo con el getAttribute

            renderEvents();
        });
    });

}

function save(data){ // llave: valor
    localStorage.setItem('items', data); // necesitamos darle un nombre a lo que vayamos a guardar
}

function load(){
    return localStorage.getItem('items')
}