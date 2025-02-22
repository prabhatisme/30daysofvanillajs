/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = [...player.querySelectorAll('[data-skip]')];
const ranges = [...player.querySelectorAll('.player__slider')];
const fullscreenButton = player.querySelector('.fullscreen-button');

/* Functions */
const togglePlay = () => video[video.paused ? 'play' : 'pause']();
const updateButton = () => (toggle.textContent = video.paused ? '►' : '❚ ❚');
const skip = (e) => (video.currentTime += parseFloat(e.target.dataset.skip));
const handleRangeUpdate = (e) => (video[e.target.name] = e.target.value);
const handleProgress = () => (progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`);
const scrub = (e) => mousedown && (video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration);

/* Fullscreen Toggle */
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    player.requestFullscreen?.() || player.mozRequestFullScreen?.() || player.webkitRequestFullscreen?.() || player.msRequestFullscreen?.();
  } else {
    document.exitFullscreen?.() || document.mozCancelFullScreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
  }
};
const handleKeyPress = (e) => {
  if (e.code === 'Space' || e.keyCode === 32) {
    e.preventDefault(); // Prevents scrolling when Spacebar is pressed
    togglePlay();
  }
};

/* Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', (e) => scrub(e));
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mouseleave', () => (mousedown = false));

fullscreenButton.addEventListener('click', toggleFullScreen);
document.addEventListener('keydown', handleKeyPress);