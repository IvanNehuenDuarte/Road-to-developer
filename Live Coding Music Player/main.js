// Songs Data
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbrezee.mp3",
        cover: "1.jpeg"
    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
];

// Canción actual
let actualSong = null;

// Capturar elementos del DOM para trabajar con js
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");


// Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress) 

// Escuchar en que parte de la barra de progreso se hace click
progressContainer.addEventListener('click', setProgress)

// Escuchar los clicks de controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong());

prev.addEventListener("click", () => prevSong());

// Cargar canciones y mostrar el listado
function loadSongs(){
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Añadir li a ul
        songs.appendChild(li)
    });
};

function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./music/" + songList[songIndex].file
        playSong()
        changeSongTitle(songIndex)
        changeCover(songIndex)
    }
};

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
    console.log(event);
}

// Hacer la barra de progreso clickeable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

// Actualizar controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

// Play song
function playSong() {
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}

// Pause song
function pauseSong() {
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a");
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// cambiar el cover de la canción
function changeCover(songIndex) {
    cover.src = "./img/" + songList[songIndex].cover
};

// Cambiar titulo de la canción
function changeSongTitle(songIndex) {
    title.innerText = songList[songIndex].title
};

// Anterior canción
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

// Siguiente canción
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}

// Siguiente canción cuando termine una
audio.addEventListener("ended", () => nextSong())

// Go
loadSongs()