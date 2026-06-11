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

    glow.addColorStop(0,   "rgba(139, 92, 246, 0.07)"); // roxo a 7%
    glow.addColorStop(1,   "rgba(139, 92, 246, 0.00)"); // transparente

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);   // pinta sobre TODO o canvas

    particulas.forEach(p => {

    // Move a partícula somando a velocidade à posição
    p.x += p.vx;
    p.y += p.vy;   // vy é negativo → y diminui → sobe na tela

    // Quando sai pelo topo (y < -10), reposiciona na base
    if (p.y < -10) {
        p.y  = H + 10;             // começa logo abaixo da tela
        p.x  = Math.random() * W;  // em posição X aleatória
    }

    // Quando sai pelas laterais, aparece no lado oposto (loop)
    if (p.x < -10)    p.x = W + 10;
    if (p.x > W + 10) p.x = -10;

    // Desenha o círculo
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

    // Concatena a string de cor com a opacidade e fecha o rgba()
    // Ex: "rgba(139, 92, 246," + 0.3 + ")" = "rgba(139, 92, 246, 0.3)"
    ctx.fillStyle = p.color + p.opacity + ")";

    ctx.fill();
    });

    // Agenda o próximo frame (~16ms depois = ~60fps)
    requestAnimationFrame(animar);
}

// Dispara o loop
animar();
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
window.addEventListener('resize', () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
});