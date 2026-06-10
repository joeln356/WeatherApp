const celsius = document.querySelector('#celsius')
const fahrenheit = document.querySelector('#fahrenheit')

fahrenheit.addEventListener('click', ()=>{
    fahrenheit.classList.add('grauAtivo')
    celsius.classList.remove('grauAtivo')
})
celsius.addEventListener('click', ()=>{
    celsius.classList.add('grauAtivo')
    fahrenheit.classList.remove('grauAtivo')
})