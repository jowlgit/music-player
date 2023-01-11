let musicas = [
    {
        titulo: 'Warriors', 
        artista: 'Imagine Dragons',
        src: 'msc/Warriors (ft. Imagine Dragons) Worlds 2014 - League of Legends.mp3',
        img: 'img/warriors.jpeg',
    },
    {
        titulo: 'Rise', 
        artista: 'Mako',
        src: 'msc/RISE (ft. The Glitch Mob Mako and The Word Alive) Worlds 2018 - League of Legends.mp3',
        img: 'img/rise.jpeg',
    },
    {
        titulo: 'STARWALKIN', 
        artista: 'Li Nas X',
        src: 'msc/Starwalkin.mp3',
        img: 'img/starwalkin.jpg',
    }
];

let musica = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.description h2');
let nomeArtista = document.querySelector('.description p');

renderizarMusica(indexMusica);

duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', updateBar);

document.querySelector('.seta-retornar').addEventListener('click', () => {
    indexMusica--;
    if(indexMusica < 0){
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
});

document.querySelector('.seta-avancar').addEventListener('click', () => {
    indexMusica++;
    if(indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
 
});

function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration-musica.currentTime));
    });
 }

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
    
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';

}

function updateBar(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}