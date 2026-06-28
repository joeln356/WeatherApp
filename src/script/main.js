// Cores no SetGraus
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');
let unidade = 'celsius'
fahrenheit.addEventListener('click', ()=>{
    fahrenheit.classList.add('grauAtivo')
    celsius.classList.remove('grauAtivo')
    unidade = 'fahrenheit'
    console.log(unidade)
    Current_Weather_Data(lat, lon);
    Proximas3H(lat, lon)
    next5Days(lat, lon)
    GetWeatherCP()
    GetWeatherNY()
    GetWeatherJP()
    
})
celsius.addEventListener('click', ()=>{
    celsius.classList.add('grauAtivo');
    fahrenheit.classList.remove('grauAtivo');
    unidade = 'celsius'
    console.log(unidade)
    Current_Weather_Data(lat, lon);
    Proximas3H(lat, lon)
    next5Days(lat, lon)
    GetWeatherCP()
    GetWeatherNY()
    GetWeatherJP()
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

    hora.innerHTML = agora.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
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

//Obter a localização atual
let lat = null
let lon = null

fetch('http://ip-api.com/json/')
    .then(res => res.json())
    .then(dados => {

document.getElementById('cidade').innerHTML = dados.city
document.getElementById('pais').innerHTML = dados.country

lat = dados.lat
lon = dados.lon
Current_Weather_Data(lat, lon);
Proximas3H(lat, lon)
next5Days(lat, lon)
UVINDEX(lat, lon)
})

// Obtendo o tempo atual
const APIkey = 'acd126cb1b8c63520fa45c6f0f32164a'

function next5Days(lat, lon){
    let units = unidade === 'celsius' ? 'metric' : 'imperial'

    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`
    
    fetch(URL)
        .then(res => res.json())
        .then(dados =>{
            
            const data = new Date()
            
            const tempe_max = [...document.querySelectorAll('.temperaturas')]
            const temp_min = [...document.querySelectorAll('.temp_min')]
            const dias5_icon = [...document.querySelectorAll('.dias5_icon')]
            const fiveDays = [...document.querySelectorAll('.dia')]
            
            temperature_max = [];
            temperature_min = [];
             

            fiveDays.forEach((fiveday, index) => {
                let num = data.getDay()+1+index
                fiveday.innerHTML = week[num % 7];
            })
            dias = [ 8, 16, 24, 32, 39]

            tempe_max.forEach((tempe_max, index) => {
                const val = dias[index];
                
                tempe_max.innerHTML = `${Math.round(dados.list[val].main.temp_max)}º`;
                temperature_max.push(Math.round(dados.list[val].main.temp_max))
            });
    
            temp_min.forEach((temp_min, index)=>{
                const valor = dias[index];
                temp_min.innerHTML = `${Math.floor(dados.list[valor].main.temp_min)}º`;
                temperature_min.push(Math.floor(dados.list[valor].main.temp_min))
            })
            const days = document.querySelectorAll('.day');
            let global_min = Math.min(...temperature_min);
            let global_max = Math.max(...temperature_max);
            let range_total = global_max - global_min;
            days.forEach((day, index) => {
                const range = day.querySelector(".range");

                let min = temperature_min[index];
                let max = temperature_max[index];

                let left = ((min - global_min) / range_total) * 100;
                let  width = ((max - min) / range_total) * 100;
                
                range.style.left = left + "%";
                width = Math.max(width, 2);
                range.style.width = width + "%";
                
            });

            dias5_icon.forEach((_5dia, index) =>{
                const valo = dias[index];
                let iconCode = dados.list[valo].weather[0].icon
                
                let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                _5dia.src = iconURL
            })
        })
}


function Proximas3H(lat, lon){
    let units = unidade === 'celsius' ? 'metric' : 'imperial'
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}&cnt=8`;
    fetch(URL)
        .then(res => res.json())
        .then(res => {
            
            let desc = [...document.querySelectorAll('.hourly')]
            desc.forEach((descri, indice) =>{
                descri.innerHTML = res.list[indice].weather[0].description
            })

            temperaturas = [...document.querySelectorAll('.temp')]
            temperaturas.forEach((temperatura, indice) =>{
                temperatura.innerHTML = `${Math.round(res.list[indice].main.temp)}º`;
            })

            let hours = [...document.querySelectorAll('.hour_3')]
            hours.forEach((hourElement, indice) => {
                const item = res.list[indice];
                if (!item) return;

                const data = new Date(item.dt_txt);
                
                const horaFormatada = data.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    hour12: true
                });

                hourElement.innerHTML = horaFormatada;
            });
            let icones = [...document.querySelectorAll('#iconn')]
            icones.forEach((icone, indice) =>{
                let iconCode = res.list[indice].weather[0].icon
                let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                icone.src = iconURL
                
            })
        })
}

function Current_Weather_Data(lat, lon){
    let units = unidade === 'celsius' ? 'metric' : 'imperial'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`;
    fetch(URL)
        .then(res => res.json())
        .then(res=>{
            document.getElementById('grau').innerHTML = `${Math.round(res.main.temp)}º`;
            document.getElementById('cidade').innerHTML = res.name
            document.getElementById('pais').innerHTML = res.sys.country
            document.getElementById('nomedoTempo').innerHTML = res.weather[0].description;
            let v = units === 'metric' ? 'm/s' : "mph"
            document.getElementById('v').innerHTML = `${v}`
            document.getElementById('ventonum').innerHTML = `${res.wind.speed} ${v}`;
            document.getElementById('vento_3').innerHTML = res.wind.speed
            
            let ap = units === 'metric' ? 'ºC' : "ºF"
            document.getElementById('feeslike').innerHTML = `${Math.round(res.main.feels_like)}${ap}`;

            document.getElementById('humidade__3').innerHTML = `${res.main.humidity}%`;
            if(res.main.humidity <= 30){
                document.getElementById('shumidade').innerHTML = 'Low';
            } else if(res.main.humidity <= 60){
                document.getElementById('shumidade').innerHTML = 'Moderate';
            } else if(res.main.humidity <= 80){
                document.getElementById('shumidade').innerHTML = 'High';
            }else if(res.main.humidity === undefined){
                 document.getElementById('shumidade').innerHTML = 'Unavailable';
            }else{
                document.getElementById('shumidade').innerHTML = 'Very High';
            }

            document.getElementById('humidade').innerHTML = `${res.main.humidity}%`;
            let visibilidade  = res.visibility / 1000;
            document.getElementById('visibilidade').innerHTML = `${visibilidade} Km`;
            let iconCode = res.weather[0].icon

            let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            document.getElementById('icon').src = iconURL;
        })
}
// setInterval(Current_Weather_Data, 1000)
// Pegar Cidade
let cidade = null

const form = document.getElementById('Search__Box')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    cidade = document.getElementById('Search').value
    
    const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&appid=${APIkey}`
    fetch(URL)
        .then(res => res.json())
        .then(res =>{

            lat = res[0].lat
            lon = res[0].lon
            console.log(lat, lon)
            Current_Weather_Data(lat, lon)
            Proximas3H(lat, lon)
            next5Days(lat, lon)
            UVINDEX(lat, lon)
        })
})
function UVINDEX(lat, lon){
    const url = `http://api.weatherapi.com/v1/current.json?key=417c92b7a2524a1a80d132025262706&q=${lat},${lon}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        document.getElementById('UVin').innerHTML = data.current.uv
        if(data.current.uv <=2){
            document.getElementById('UVindextxt').innerHTML = 'Low';
        }else if(data.current.uv <=5){
            document.getElementById('UVindextxt').innerHTML = 'Moderate';
        }else if(data.current.uv <=7){
            document.getElementById('UVindextxt').innerHTML = 'High';
        }else if(data.current.uv <=10){
            document.getElementById('UVindextxt').innerHTML = 'Very High';
        }else{
            document.getElementById('UVindextxt').innerHTML = 'Extreme';
        }
    });
}
function GetWeatherNY(){
    let units = unidade === 'celsius' ? 'metric' : 'imperial'
    const NY = `https://api.openweathermap.org/data/2.5/weather?lat=${40.7127281}&lon=${-74.0060152}&appid=${APIkey}&units=${units}`;
fetch(NY)
    .then(res => res.json())
    .then(dados => {
        document.getElementById('temp__1').innerHTML = `${Math.round(dados.main.temp)}º`;
        document.getElementById('desc__1').innerHTML = dados.weather[0].description;
        document.getElementById('city1').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    })
}

function GetWeatherJP(){
    let units = unidade === 'celsius' ? 'metric' : 'imperial'

    const Osaka = `https://api.openweathermap.org/data/2.5/weather?lat=${34.6937}&lon=${135.5023}&appid=${APIkey}&units=${units}`;
    fetch(Osaka)
        .then(res => res.json())
        .then(dados => {
            console.log()
            document.getElementById('temp__2').innerHTML = `${Math.round(dados.main.temp)}º`;
            document.getElementById('desc__2').innerHTML = dados.weather[0].description;
            document.getElementById('city2').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
        })
}

function GetWeatherCP(){
    let units = unidade === 'celsius' ? 'metric' : 'imperial'
    const Cape_Town = `https://api.openweathermap.org/data/2.5/weather?lat=${-33.9249}&lon=${18.4241}&appid=${APIkey}&units=${units}`;
    fetch(Cape_Town)
        .then(res => res.json())
        .then(dados => {
            document.getElementById('temp__3').innerHTML = `${Math.round(dados.main.temp)}º`;
            document.getElementById('desc__3').innerHTML = dados.weather[0].description;
            document.getElementById('city3').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
        })
}

GetWeatherCP()
GetWeatherNY()
GetWeatherJP()