const container = document.querySelector(".container");
const image = document.getElementById("music-image");
const audio = document.getElementById("audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const next = document.getElementById("next");

const player = new MusicPlayer(musicList)


window.addEventListener("load", () =>{
    let music = player.getMusic()
    displayMusic(music)
});

const displayMusic = (music) => {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () =>{
    audio.play();
    play.classList.add("dissplayed");
    pause.classList.remove("dissplayed")
});

pause.addEventListener("click", () =>{
    audio.pause();
    pause.classList.add("dissplayed")
    play.classList.remove("dissplayed");
})

next.addEventListener("click", () =>{
    player.next()
    let music = player.getMusic()
    displayMusic(music)
    audio.play();
    play.classList.add("dissplayed");
    pause.classList.remove("dissplayed")
})

prev.addEventListener("click", () =>{
    player.previous()
    let music = player.getMusic()
    displayMusic(music)
    audio.play();
    play.classList.add("dissplayed");
    pause.classList.remove("dissplayed")
})


