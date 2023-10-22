let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentSongIndex = 0; // Keep track of the current song index

const songs = [
  {
    songSource: 'assets/songs/ocean-eyes.mp3',
    coverSource: 'assets/images/ocean-eyes.png',
    songName: 'Ocean Eyes',
    artistName: 'Billie Eilish'
  },
  {
    songSource: 'assets/songs/misa-misa.mp3',
    coverSource: 'assets/images/misa-misa.png',
    songName: 'Misa Misa',
    artistName: 'Corpse'
  },
  {
    songSource: 'assets/songs/useless.mp3',
    coverSource: 'assets/images/useless.png',
    songName: 'Useless',
    artistName: 'Omar Apollo'
  }
];

// Check if the song was playing before
let isPlaying = localStorage.getItem("isPlaying") === "true";

// Update the play/pause button based on the stored state
if (isPlaying) {
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
} else {
  ctrlIcon.classList.remove("fa-pause");
  ctrlIcon.classList.add("fa-play");
}

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
}

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    localStorage.setItem("isPlaying", "false");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    localStorage.setItem("isPlaying", "true");
  }
}

if (isPlaying) {
  song.play();
}

setInterval(() => {
  progress.value = song.currentTime;
}, 500);

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
  localStorage.setItem("isPlaying", "true");
}

// Function to move to the previous song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer();
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Function to move to the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer();
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Function to update the player with song information
function updatePlayer() {
  song.src = songs[currentSongIndex].songSource;
  document.querySelector(".song-img").src = songs[currentSongIndex].coverSource;
  document.getElementById("songName").textContent = songs[currentSongIndex].songName;
  document.getElementById("artistName").textContent = songs[currentSongIndex].artistName;
}

// Attach the previousSong function to the backward button
document.querySelector(".fa-backward").addEventListener("click", previousSong);

// Attach the nextSong function to the forward button
document.querySelector(".fa-forward").addEventListener("click", nextSong);

// Function to select a song
function selectSong(songSource, coverSource, songName, artistName) {
    // Replace the current song source, cover photo source, song name, and artist name
    song.src = songSource;
    document.querySelector(".song-img").src = coverSource;
    document.getElementById("songName").textContent = songName;
    document.getElementById("artistName").textContent = artistName;

    // Play the selected song
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Function to open the song list
function openSongList() {
    const songList = document.querySelector(".song-list");
    songList.style.left = "80%"; // Slide to the active position
    songList.classList.add("active");
}

// Function to move the song list back to the music player
function moveSongListBack() {
    const songList = document.querySelector(".song-list");
    songList.style.left = "63%"; // Slide back to the initial position
    songList.classList.remove("active");
}

// Attach the openSongList function to the bars icon
document.querySelector(".fa-bars").addEventListener("click", openSongList);

// Attach the moveSongListBack function to the close button
document.querySelector(".close-button").addEventListener("click", moveSongListBack);

let volumeControl = document.getElementById("volume");

// Function to change the volume
function changeVolume() {
    song.volume = volumeControl.value;
}

// Set the initial volume
song.volume = volumeControl.value;
