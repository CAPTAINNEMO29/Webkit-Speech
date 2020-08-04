const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const text = document.getElementById('text');
const btnPlay = document.getElementById('btnPlay');

//solo funcionara en motores chrome
let recognition = new webkitSpeechRecognition();
//especifica el idioma
recognition.lang = 'es-ES';
//para decirle que grabe continuamente
recognition.continuous = true; 
//hasta que no nos callemos no devulve resultados
recognition.interimResults = false;

recognition.onresult = (event) => {
    const results = event.results;
    //donde se encuentra la transcripcion normalmente
    const frase = results[results.length - 1][0].transcript;
    text.value += frase;
}

recognition.onend = (event) => {
    console.log('el microfono deja de escuchar');
}

recognition.onerror = (event) =>{
    console.log(event.error);
}

btnStart.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    recognition.abort();
});

btnPlay.addEventListener('click', () => {
    readText(text.value);
});

//respuesta del navegador

function readText(text){
    const speech = new SpeechSynthesisUtterance();
    //este es el texto que va a leer
    speech.text = text;
    //volumen
    speech.volume = 1;
    //velocidad
    speech.rate = 1;
    //tono
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}