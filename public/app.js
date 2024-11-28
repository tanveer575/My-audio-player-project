// Get elements
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById('volumeControl');
const fileInput = document.getElementById('fileInput');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const box = document.querySelector('.box'); 

// Array of audio tracks
//let audioFiles = [];
//let currentTrackIndex = -1;

// Play/Pause Button Functionality
playPauseBtn.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        box.style.animationPlayState = 'running'; 
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        box.style.animationPlayState = 'paused';
    }
});


audio.addEventListener('timeupdate', function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #007bff ${progress}%, #e0e0e0 ${progress}%)`;
});


progressBar.addEventListener('input', function () {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});


volumeControl.addEventListener('input', function () {
    audio.volume = volumeControl.value / 100;
});


fileInput.addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length > 0) {
        audioFiles = Array.from(files); 
        currentTrackIndex = 0;
        loadAudioTrack(currentTrackIndex);
    }
});


function loadAudioTrack(index) {
    if (index >= 0 && index < audioFiles.length) {
        const fileURL = URL.createObjectURL(audioFiles[index]);
        audio.src = fileURL;
        audio.play();  
        playPauseBtn.textContent = 'Pause';
    }
}


nextBtn.addEventListener('click', function () {
    if (currentTrackIndex < audioFiles.length - 1) {
        currentTrackIndex++;
        loadAudioTrack(currentTrackIndex);
    }
});


prevBtn.addEventListener('click', function () {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        loadAudioTrack(currentTrackIndex);
    }
});


audio.addEventListener('ended', function () {
    if (currentTrackIndex < audioFiles.length - 1) {
        currentTrackIndex++;
        loadAudioTrack(currentTrackIndex);  
    } else {
        currentTrackIndex = 0;  
        loadAudioTrack(currentTrackIndex); 
    }
});

audio.addEventListener('play', () => {
    box.style.animationPlayState = 'running'; 
});


audio.addEventListener('pause', () => {
    box.style.animationPlayState = 'paused'; 
});



const favoriteBtn = document.getElementById('favoriteBtn');


favoriteBtn.addEventListener('click', function() {

    favoriteBtn.classList.toggle('favorited');
});

const playlist = document.getElementById('playlist');

let audioFiles = [];
let currentTrackIndex = -1;


fileInput.addEventListener('change', function (event) {
    const files = Array.from(event.target.files);
        
    audioFiles = [];
    playlist.innerHTML = "";

    files.forEach((file, index) => {
        const fileObject = {
            name: file.name,
            url: URL.createObjectURL(file),
        };
        audioFiles.push(fileObject);

        const li = document.createElement('li');
        li.textContent = file.name;
        li.dataset.index = index;
        playlist.appendChild(li);
    });

    if (audioFiles.length > 0) {
        currentTrackIndex = 0;
        loadAudioTrack(currentTrackIndex);
    }
});


function loadAudioTrack(index) {
    if (index >= 0 && index < audioFiles.length) {
        const track = audioFiles[index];
        audio.src = track.url;
        audio.play();

        updateActiveTrack(index);
    }
}

function updateActiveTrack(index) {
    const items = playlist.querySelectorAll('li');
    items.forEach(item => item.classList.remove('active'));
    items[index].classList.add('active');
}

playlist.addEventListener('click', function (event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'LI') {
        const index = parseInt(clickedElement.dataset.index);
        currentTrackIndex = index;
        loadAudioTrack(currentTrackIndex);
    }
})
const decks = document.querySelectorAll('.ulest');

decks.forEach(deck => {
  deck.addEventListener('click', function() {
    // .list element ko target karna aur 'active' class toggle karna
    const list = document.querySelector('.list');
    list.classList.toggle('active');
  });
});
