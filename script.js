// js for js30part1
'use strict';

const navMenu = document.getElementById('menu');
const navList = document.getElementById('list');
navList.addEventListener('click', eventAction);

const divEntry = document.getElementById('entry');
entry.lastElementChild.onclick = getWithBats;
entry.firstElementChild.onclick = getWithBirds;

const audioVoice = voice.children.audiovoice;
const playVoice = voice.children.playvoice;
playVoice.addEventListener('click', playAction);

const audioSound = audio.children.audiosound;
audioSound.addEventListener('timeupdate', checkTrack);
const playSound = control.children.playsound;
control.addEventListener('click', controlSound);

let trackNumber = 0;
const playList = ['kuvalda', 'doisay', 'lukich', 'instinkt', 'forhate', 'zlost'];
let trackCover = playList[trackNumber];

const lineTime = document.getElementById('timeline');
const showTime = document.getElementById('timeshow');
lineTime.addEventListener('input', changeTrack);

function preloadImg() {
	const img = new Image();
	const bgr = voice.style;
	const arr = ['solovey', 'drozd', 'malinovka', 'zhavoronok', 'slavka', 'forest'];
	for (let i=0; i < 6; i++) {
		img.src = `./assets/img/${arr[i]}.jpg`;
		bgr.backgroundImage = `url(./assets/img/${arr[i]}.jpg)`;
	};
	audio.style.backgroundImage = `url(./assets/img/nightbat.jpg)`;
	audiodesign.style.backgroundImage = `url(./assets/covers/batsdark.jpg)`;
	for (let item of playList) {
		player.style.backgroundImage = `url(./assets/covers/${item}.jpg)`;
		player.style.backgroundImage = `url(./assets/covers/batbefore.gif)`;
	};
	playSound.style.backgroundImage = `url(./assets/control/pause2.png)`;
	playSound.style.backgroundImage = `url(./assets/control/play2.png)`;
	playSound.style.backgroundImage = ``;
};

preloadImg();

function getWithBats() {
	waldo.classList.add('none');
	navList.classList.add('none');
	klimt.classList.remove('none');
	entry.classList.add('down');
	audio.classList.remove('none');
	audio.classList.add('rise');
	console.log('Get with Bats');
};

function getWithBirds() {
	waldo.classList.add('none');
	klimt.classList.add('none');
	navList.classList.remove('none');
	entry.classList.add('down');
	voice.classList.remove('none');
	voice.classList.add('rise');
	console.log('Get with Birds');
};

function eventAction(event) {
	let item = event.target.name;
	for (let child of navList.children){
		child.classList.remove('active');
		};
	event.target.classList.add('active');
	voice.style.backgroundImage = `url(./assets/img/${item}.jpg)`;
	playVoice.classList.add('pausevoice');
	audioVoice.src = `./assets/audio/${item}.mp3`;
	audioVoice.dataset.status = 'play';
	audioVoice.currentTime = 0;
	audioVoice.play();
	console.log('You click on: ', item);
	console.log('Current status is: ', audioVoice.dataset.status);
};

function playAction(event) {
	let audioObject = null;
	let audioFrame = null;
	let pauseStyle = null;
	console.log(trackNumber);
	console.log('Track: ', trackCover);
	if (event.target.dataset.object === 'audiovoice') {
		audioObject = audioVoice;
		audioFrame = playVoice;
		pauseStyle = 'pausevoice';
	} else if (event.target.dataset.object === 'audiosound') {
		audioObject = audioSound;
		audioFrame = playSound;
		pauseStyle = 'pausesound';
		player.style.backgroundImage = `url(./assets/covers/${trackCover}.jpg)`;
	};
	switch (audioObject.dataset.status) {
		case "stasis":
		// Statements stasis;
		audioFrame.classList.add(`${pauseStyle}`);
		audioObject.dataset.status = 'play';
		audioObject.currentTime = 0;
		audioObject.play();
		break;
		case "pause":
		// Statements pause;
		audioFrame.classList.add(`${pauseStyle}`);
		audioObject.dataset.status = 'play';
		audioObject.play();
		break;
		case "play":
		// Statements play;
		audioFrame.classList.remove(`${pauseStyle}`);
		audioObject.dataset.status = 'pause';
		audioObject.pause();
		break;
		default:
		console.log(event, event.target, event.target.dataset);
		audioFrame.classList.remove(`${pauseStyle}`);
		audioObject.dataset.status = 'stasis';
		audioObject.pause();
		audioObject.currentTime = 0;
		break;
	};
	console.log('Status: ', audioObject.dataset.status);
};

function controlSound(event) {
	const listLength = playList.length;
	if (event.target.id === 'playsound') {
		playAction(event);
	} else if (event.target.id === 'backward') {
		if (trackNumber <= 0) {
			trackNumber = (listLength - 1);
			trackCover = playList[trackNumber];
			console.log(trackNumber);
		} else if (trackNumber > 0) {
			trackNumber = trackNumber - 1;
			trackCover = playList[trackNumber];
			console.log(trackNumber);
		};
		backForward();
	} else if (event.target.id === 'forward') {
		if (trackNumber >= listLength - 1) {
			trackNumber = 0;
			trackCover = playList[trackNumber];
			console.log(trackNumber);
		} else if (trackNumber < listLength) {
			trackNumber = trackNumber + 1;
			trackCover = playList[trackNumber];
			console.log(trackNumber);
		};
		backForward();
	};
};

function backForward() {
	player.style.backgroundImage = `url(./assets/covers/${trackCover}.jpg)`;
	// console.log(player.style.backgroundImage);
	audioSound.src = `./assets/music/${playList[trackNumber]}.mp3`;
	console.log('Track: ', playList[trackNumber]);
	audioSound.dataset.status = 'play';
	playSound.classList.add('pausesound');
	audioSound.dataset.track = playList[trackNumber];
	console.log('Status: ', audioSound.dataset.status);
	audioSound.play();
	return true;
};

function changeTrack() {
	audioSound.currentTime = this.value;
	// console.log('Change value: ', lineTime.value);
	return false;
};

function checkTrack() {
	let durAudio = Math.trunc(audioSound.duration);
	let curAudio = Math.trunc(audioSound.currentTime);
	const passTime = document.getElementById('passed');
	const totalTime = document.getElementById('total');
		if (isNaN(durAudio)) {
			// console.log('Duration is NaN');
			return false;
		} else {
			let totalMin = Math.trunc(durAudio / 60);
			let totalSec = Math.trunc(durAudio % 60);
				if (totalSec < 10) {
					totalTime.textContent = `0${totalMin}:0${totalSec}`;
				} else {
					totalTime.textContent = `0${totalMin}:${totalSec}`;
				};
			let passMin = Math.trunc(curAudio / 60);
			let passSec = Math.trunc(curAudio % 60);
				if (passSec < 10) {
					passTime.textContent = `0${passMin}:0${passSec}`;
				} else {
					passTime.textContent = `0${passMin}:${passSec}`;
				};
			lineTime.max = durAudio;
			lineTime.value = curAudio;
			// console.log('Setup current: ', curAudio);
		};
	return true;
};

audioSound.onended = function() {
	let isEnded = audioSound.ended;
		if (isEnded) {
			let nextTrack = new Event('click', {bubbles: true});
			control.children.forward.dispatchEvent(nextTrack);
			// console.log('IsEnded NextTrack');
			return true;
		};
};

window.onload = console.log('The page was loaded');
