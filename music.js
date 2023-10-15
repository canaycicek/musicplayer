class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }
}

const musicList = [
  new Music(
    "Uyuyakaldım",
    "Miraç",
    "uyuyakaldim.jpg",
    "Mirac  - Uyuyakaldım  Official Video.mp3"
  ),
  new Music(
    "Uyuyakaldım2",
    "Kedi",
    "uyuyakaldim2.jpg",
    "Uyuya Kaldım Kedi Remix by okanferhat.mp3"
  ),
  new Music("Alone", "Crew", "Alone.png", "alone.mp3"),
  new Music("Angel", "Crew", "Angel.png", "angel.mp3"),
  new Music("Forever", "Crew", "Forever.png", "forever.mp3"),
  new Music("Feel", "Crew", "Feel.png", "feel.mp3"),
];
