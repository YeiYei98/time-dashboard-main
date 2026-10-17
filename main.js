const daily = document.querySelector('#daily')
const weekly = document.querySelector('#weekly')
const monthly = document.querySelector('#monthly')

let data = []

async function cargarDatos() {
    const respuesta = await fetch('./data.json');
    if (!respuesta.ok) throw new Error("Error al cargar los datos.");
    
    data = await respuesta.json();
    
    card('Last Week','weekly');
    
}



//Crear cada tarjeta
function card(tiempo, horas){
    const seccionCard = document.querySelector('.seccion-card');
    seccionCard.innerHTML = '';
    data.forEach(actividades => {
        //Crear un div que contenga a section para diferenciar los colores
        const divCard = document.createElement('div')
        divCard.classList.add(actividades.title.toLowerCase().replace(" ", "-"))
        divCard.classList.add('clase-comun')
        //Crear elementos section
        const tarjeta = document.createElement('section');
        tarjeta.classList.add('tarjeta-actividad');
        
        //Creando los elementos img
        const elementImg = document.createElement('img');
        elementImg.classList.add('imagen-actividad')
        elementImg.src = `./images/icon-${actividades.title.toLowerCase().replace(" ", "-")}.svg`;

        //Crear titulos
        const titulos = document.createElement('h2');
        titulos.classList.add('titulo')
        titulos.textContent = actividades.title;
        
        //Texto de las horas actuales
        const horasActuales = document.createElement('p')
        horasActuales.classList.add('horas-actuales')
        horasActuales.textContent = `${actividades.timeframes[horas].current}hrs`;

        //Imagen de opciones
        const imgOpciones = document.createElement('img')
        imgOpciones.classList.add('img-opciones')
        imgOpciones.src = './images/icon-ellipsis.svg';

        //Texto de horas previas
        const horasPrevias = document.createElement('p')
        horasPrevias.classList.add('horas-previas')
        horasPrevias.textContent = `${tiempo} - ${actividades.timeframes[horas].previous}hrs`;
        tarjeta.appendChild(titulos);
        tarjeta.appendChild(horasActuales);
        tarjeta.appendChild(imgOpciones)
        tarjeta.appendChild(horasPrevias);
        divCard.appendChild(elementImg)
    
    divCard.append(tarjeta)
    seccionCard.append(divCard);

    })
    
}
cargarDatos();


daily.addEventListener('click', () => { 
    card('Yesterday','daily');

    daily.classList.add('seleccionado')
    weekly.classList.remove('seleccionado')
    monthly.classList.remove('seleccionado')
})
weekly.addEventListener('click', () => { 
    card('Last Week','weekly');
    
    daily.classList.remove('seleccionado')
    weekly.classList.add('seleccionado')
    monthly.classList.remove('seleccionado')
})
monthly.addEventListener('click', () => {
    card('Last Month', 'monthly');

    daily.classList.remove('seleccionado')
    weekly.classList.remove('seleccionado')
    monthly.classList.add('seleccionado')
})

