const container = document.querySelector(".container");
const image = document.getElementById("music-image");
const audio = document.getElementById("audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const next = document.getElementById("next");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("currentTime");
const progressBar = document.getElementById("progressBar")
const volumeUp = document.getElementById("volumeUp")
const volumeDown = document.getElementById("volumeDown")
const volumeBar = document.getElementById("volumeBar")
const btnPlay = document.querySelector(".btnPlay")
const btnPause = document.querySelector(".btnPause")

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

const calculateTime = (totalSeconds) =>{
    const minute = Math.floor(totalSeconds / 60)
    const second = Math.floor(totalSeconds % 60)
    const updateSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${updateSecond}`;
    return result
}

play.addEventListener("click", () =>{
    audio.play();
    btnPlay.classList.add("dissplayed");
    btnPause.classList.remove("dissplayed")
});

pause.addEventListener("click", () =>{
    audio.pause();
    btnPause.classList.add("dissplayed")
    btnPlay.classList.remove("dissplayed");
})

next.addEventListener("click", () =>{
    player.next()
    let music = player.getMusic()
    displayMusic(music)
    audio.play();
    btnPlay.classList.add("dissplayed");
    btnPause.classList.remove("dissplayed")
    audio.muted = false
    volumeBar.value = 100
    volumeUp.classList.remove("dissplayed")
    volumeDown.classList.add("dissplayed")
})

prev.addEventListener("click", () =>{
    player.previous()
    let music = player.getMusic()
    displayMusic(music)
    audio.play();
    btnPlay.classList.add("dissplayed");
    btnPause.classList.remove("dissplayed")
    audio.muted = false
    volumeBar.value = 100
    volumeUp.classList.remove("dissplayed")
    volumeDown.classList.add("dissplayed")
})

volumeUp.addEventListener("click", () =>{
    volumeUp.classList.add("dissplayed")
    volumeDown.classList.remove("dissplayed")
    audio.muted = true
    volumeBar.value = 0
})

volumeDown.addEventListener("click", () =>{
    volumeDown.classList.add("dissplayed")
    volumeUp.classList.remove("dissplayed")
    audio.muted = false
    volumeBar.value = 100
})



audio.addEventListener("loadedmetadata", () =>{
    duration.textContent = calculateTime(audio.duration)
    progressBar.max = Math.floor(audio.duration)
})

audio.addEventListener("timeupdate", () =>{
    progressBar.value = Math.floor(audio.currentTime)
    currentTime.textContent = calculateTime(progressBar.value)
    
    if(currentTime.textContent == duration.textContent){
        btnPause.classList.add("dissplayed")
        btnPlay.classList.remove("dissplayed");
    }
})

progressBar.addEventListener("input", () =>{
    audio.play();
    btnPlay.classList.add("dissplayed");
    btnPause.classList.remove("dissplayed")

    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime = progressBar.value

})

volumeBar.addEventListener("input", (e) =>{
    const value = e.target.value;
    audio.volume = value / 100;

    if(value == 0){
        volumeUp.classList.add("dissplayed")
        volumeDown.classList.remove("dissplayed")
    }else{
        volumeDown.classList.add("dissplayed")
        volumeUp.classList.remove("dissplayed")
    }
})

