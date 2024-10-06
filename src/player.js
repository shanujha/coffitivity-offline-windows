let audioFile, $pause, $play, _cachedSelectedMusicId;
let subtextArr = ['Where do you want to be teleported?',
  'Make your pick and start making things',
  'Pick your mood before you make things',
  'Listen awesome. Do awesome.',
  'Be productive today, pick your mood!',
  'Pick, before you start making things'
];

let randomSubtext = subtextArr[Math.floor(Math.random() * subtextArr.length)];


$pause = document.querySelector('.pausePlayBtn.icon-pause');
$play = document.querySelector('.pausePlayBtn.icon-play');

let playAudio = () => {
  if ($pause.style.visibility === 'visible') {
    audioFile.pause();
    $pause.style.visibility = 'hidden';
    $play.style.visibility = 'visible';
  } else {
    audioFile.play();
    $pause.style.visibility = 'visible';
    $play.style.visibility = 'hidden';
  }
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.mainTitle__subtext').innerText = randomSubtext;
  $pause = document.querySelector('.pausePlayBtn.icon-pause');
  $play = document.querySelector('.pausePlayBtn.icon-play');

  document.querySelector('.pausePlayContainer').addEventListener('click', () => {
    playAudio();
  });

  document.querySelector('.icon-cancel').addEventListener('click', () => {
    document.querySelector('.page3').style.display = 'none';
  });
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 80 || e.keyCode === 32) {
    // keycode for 'p' button or 'spacebar' to pause-play
    e.preventDefault();
    playAudio();
  }

  if (e.keyCode === 37) {
    // keycode for 'left-arrow' button for menu-page
    e.preventDefault();
    landingPageFn();
  }

  if (e.keyCode === 39) { // keycode for 'right-arrow' button player-page
    e.preventDefault();
    playerPageFn(localStorage.getItem('musicId'));
  }
});

let playerPageFn = (id) => {
  localStorage.setItem('musicId', id);
  let selectedMusicId = document.querySelector('#' + id);
  let selectedMusicTitle = selectedMusicId.querySelector('.musicOptBox__title').innerText;
  let selectedMusicDesc = selectedMusicId.querySelector('.musicOptBox__desc').innerText;

  if (_cachedSelectedMusicId === undefined) {
    audioFile = new Audio('../assets/' + id + '.mp3');
  } else if (_cachedSelectedMusicId !== selectedMusicId) {
    audioFile.src = '../assets/' + id + '.mp3';
  }
  audioFile.play();
  // The loop property is not always supported so add an event listener instead
  audioFile.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
  $pause.style.visibility = 'visible';
  $play.style.visibility = 'hidden';

  document.querySelector('.musicOptBox.page2')
    .querySelector('.musicOptBox__title')
    .innerText = selectedMusicTitle;

  document.querySelector('.musicOptBox.page2')
    .querySelector('.musicOptBox__desc')
    .innerText = selectedMusicDesc;

  document.querySelector('.page1').style.display = 'none';
  document.querySelector('.page2').style.display = 'block';
  document.querySelector('.musicOptBox.page2').style.display = 'block';
  _cachedSelectedMusicId = selectedMusicId;
};

let landingPageFn = () => {
  document.querySelector('.page2').style.display = 'none';
  document.querySelector('.page1').style.display = 'block';
};

let aboutPageFn = () => { //  eslint-disable-line
  document.querySelector('.page3').style.display = 'block';
};

let changeTheme = () => {
  let currentTheme = localStorage.getItem('theme') || 'style.css';
  let newTheme = (currentTheme === 'style.css') ? 'style-dark.css' : 'style.css';
  localStorage.setItem('theme', newTheme);
  document.getElementById('theme-link').href = newTheme;

  // Update icon
  let themeIcon = document.querySelector('#theme-icon');
  themeIcon.className = (newTheme === 'style.css') ? 'footer-icon icon-sun' : 'footer-icon icon-moon';
}

// Apply saved theme on page load
window.onload = () => {
  let savedTheme = localStorage.getItem('theme') || 'style.css';
  document.getElementById('theme-link').href = savedTheme;

  // Update icon
  let themeIcon = document.querySelector('#theme-icon');
  themeIcon.className = (savedTheme === 'style.css') ? 'footer-icon icon-sun' : 'footer-icon icon-moon'
};
