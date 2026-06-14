// Cores no SetGraus
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');

fahrenheit.addEventListener('click', ()=>{
    fahrenheit.classList.add('grauAtivo')
    celsius.classList.remove('grauAtivo')
})
celsius.addEventListener('click', ()=>{
    celsius.classList.add('grauAtivo');
    fahrenheit.classList.remove('grauAtivo');
})

// Particulas
const canvas = document.getElementById('particulas');
const ctx = canvas.getContext('2d');

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

let mouseX = W / 2;
let mouseY = H / 2;

const COLORS = [
    "rgba(139, 92, 246,",   // roxo   #8B5CF6
    "rgba( 56,189, 248,",   // azul   #38BDF8
    "rgba(167,139, 250,",   // lavanda #A78BFA
    "rgba( 99,102, 241,",   // índigo #6366F1
];
function CriarParticulas(){
    return{

        // Posição inicial aleatória em qualquer ponto da tela
        x: Math.random()* W,
        y: Math.random() * H,

        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.1),

        radius: Math.random() * 2 + 0.5,

        opacity: Math.random() * 0.4 + 0.1,

        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
}
const particulas = Array.from({ length: 60 }, CriarParticulas);

function animar() {

    ctx.clearRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(
    mouseX, mouseY,   0,    // círculo interno: raio 0 (ponto)
    mouseX, mouseY, 280     // círculo externo: raio 280px
    );

    glow.addColorStop(0,   "rgba(138, 92, 246, 0.07)"); // roxo a 7%
    glow.addColorStop(1,   "rgba(138, 92, 246, 0)"); // transparente

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);   

    particulas.forEach(p => {

    // Move a partícula somando a velocidade à posição
    p.x += p.vx;
    p.y += p.vy;

    if (p.y < -10) {
        p.y  = H + 10;            
        p.x  = Math.random() * W;  
    }

    if (p.x < -10)    p.x = W + 10;
    if (p.x > W + 10) p.x = -10;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

    ctx.fillStyle = p.color + p.opacity + ")";

    ctx.fill();
    });

    requestAnimationFrame(animar);
}
animar();

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
window.addEventListener('resize', () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
});


// Contaier cidade Atual
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function mostrarDia(){
    let agora = new Date();
    let dataAtual = document.getElementById('data__atual');
    dataAtual.innerHTML = `${week[agora.getDay()]}, ${month[agora.getMonth()]} ${agora.getDate()}`;
}
mostrarDia();
setInterval(mostrarDia, 86400000);

function mostrarHora(){
    let agora = new Date();
    let hora = document.getElementById('hora');

    let h = agora.getHours().toString().padStart(2, '0');
    let m = agora.getMinutes().toString().padStart(2, '0');

    hora.innerHTML = `${h}:${m} ${agora.getHours() >= 12 ? "PM" : "AM"}`;
}

function iniciarRelogio(){
    mostrarHora();

    let agora = new Date();
    let delay = (60 - agora.getSeconds()) * 1000;

    setTimeout(() => {
        mostrarHora();
        setInterval(mostrarHora, 60000);
    }, delay);
}
iniciarRelogio();
//Obter a cidade atual
let lat = null
let long = null


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(mostrarLocation, erroLocation)
    
}else{
    console.log('Não suportada')
}


async function mostrarLocation(pos){
    let coords = pos.coords
    lat = coords.latitude
    long = coords.longitude
    
    const apiID = 'acd126cb1b8c63520fa45c6f0f32164a';

    const COODS_TO_CITY = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${apiID}`;

    fetch(COODS_TO_CITY)
    .then(res =>res.json())
    .then(res =>{
        const cidade = document.getElementById('cidade')
        const pais = document.getElementById('pais')
        cidade.innerHTML = res[0].name
        pais.innerHTML = res[0].country
        console.log(res)
    })
}
function erroLocation(err){
    alert("algo deu muito errado!! " + err.message)
    
}



// const CITY_TO_COORDS = `http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid=${apiID}`;

