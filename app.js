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
const progressBar = document.getElementById("progressBar");
const volumeUp = document.getElementById("volumeUp");
const volumeDown = document.getElementById("volumeDown");
const volumeBar = document.getElementById("volumeBar");
const cardApp = document.querySelector(".cardApp");
const btnOpenList = document.getElementById("btnOpenList");
const btnCloseList = document.getElementById("btnCloseList");
const listMusic = document.querySelector(".list-group");
const cardList = document.querySelector(".cardList");
const song = document.querySelector(".song");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

const displayMusic = (music) => {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
};

const calculateTime = (totalSeconds) => {
  const minute = Math.floor(totalSeconds / 60);
  const second = Math.floor(totalSeconds % 60);
  const updateSecond = second < 10 ? `0${second}` : `${second}`;
  const result = `${minute}:${updateSecond}`;
  return result;
};

play.addEventListener("click", () => {
  audio.play();
  play.classList.add("dissplayed");
  pause.classList.remove("dissplayed");
});

pause.addEventListener("click", () => {
  audio.pause();
  pause.classList.add("dissplayed");
  play.classList.remove("dissplayed");
});

next.addEventListener("click", () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  audio.play();
  play.classList.add("dissplayed");
  pause.classList.remove("dissplayed");
  audio.muted = false;
  volumeBar.value = 100;
  volumeUp.classList.remove("dissplayed");
  volumeDown.classList.add("dissplayed");
  isPlayingNow();
});

prev.addEventListener("click", () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  audio.play();
  play.classList.add("dissplayed");
  pause.classList.remove("dissplayed");
  audio.muted = false;
  volumeBar.value = 100;
  volumeUp.classList.remove("dissplayed");
  volumeDown.classList.add("dissplayed");
  isPlayingNow();
});

volumeUp.addEventListener("click", () => {
  volumeUp.classList.add("dissplayed");
  volumeDown.classList.remove("dissplayed");
  audio.muted = true;
  volumeBar.value = 0;
});

volumeDown.addEventListener("click", () => {
  volumeDown.classList.add("dissplayed");
  volumeUp.classList.remove("dissplayed");
  audio.muted = false;
  volumeBar.value = 100;
});

btnOpenList.addEventListener("click", () => {
  btnOpenList.classList.add("dissplayed");
  btnCloseList.classList.remove("dissplayed");
  cardApp.style = "width: 750px; transition: all 1s ease-in-out";
  cardList.style = "display: flex;";
});

btnCloseList.addEventListener("click", () => {
  btnCloseList.classList.add("dissplayed");
  btnOpenList.classList.remove("dissplayed");
  cardApp.style = "width: 403px; transition: all 1s ease-in-out";
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);

  if (currentTime.textContent == duration.textContent) {
    pause.classList.add("dissplayed");
    play.classList.remove("dissplayed");
  }
});

progressBar.addEventListener("input", () => {
  audio.play();
  play.classList.add("dissplayed");
  pause.classList.remove("dissplayed");

  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;

  if (value == 0) {
    volumeUp.classList.add("dissplayed");
    volumeDown.classList.remove("dissplayed");
  } else {
    volumeDown.classList.add("dissplayed");
    volumeUp.classList.remove("dissplayed");
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
            <div songIndex='${i}' onclick="selectedMusic(this)" class="song">
                <li class="list-group-item">${list[i].getName()}</li>
                <span id="music-${i}" class="badge rounded-pill text-bg-secondary">2:09</span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </div>
        `;

    listMusic.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = listMusic.querySelector(`#music-${i}`);
    let liAudioTag = listMusic.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("songIndex");
  displayMusic(player.getMusic());
  audio.play();
  play.classList.add("dissplayed");
  pause.classList.remove("dissplayed");
  isPlayingNow();
};

const isPlayingNow = () => {
  for (const song of listMusic.querySelectorAll(".song")) {
    if (song.classList.contains("bgDark")) {
      song.classList.remove("bgDark");
    }
    if (song.getAttribute("songIndex") == player.index) {
      song.classList.add("bgDark");
    }
  }
};
