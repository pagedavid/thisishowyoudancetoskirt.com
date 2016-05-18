function setContainerSize() {
  var length = 0;
  var body = document.getElementsByTagName("BODY")[0];
  var container = document.getElementById("container");
  var title = document.getElementById("title");
  var height = window.innerHeight;
  var width = window.innerWidth;

  if (height >= width) {
    length = height;
    body.style.overflowX = "auto";
    body.style.overflowY = "hidden";
    container.style.height = length+"px";
    container.style.width = length+"px";
  } else {
    length = width;
    body.style.overflowY = "auto";
    body.style.overflowX = "hidden";
    container.style.height = length+"px";
    container.style.width = length+"px";
  }
}

function togglePlay() {
  if (isPlaying == false) {
    album.play();
    isPlaying = true;
    toggleAudio.src = "images/pause_circle.svg";
    return;
  } else {
    album.pause();
    isPlaying = false;
    toggleAudio.src = "images/play_circle.svg";
    return;
  }
}

function getTrackTitle(num) {
  return trackTitles[num - 1];
}

function nextTrack() {
  var file = album.src.split("/");
  var nextTrackNumber = parseInt(file[file.length - 1]) + 1;
  var newSource = "audio/"+nextTrackNumber+".mp3";
  trackTitle.innerHTML = getTrackTitle(nextTrackNumber);
  album.src = newSource;
  album.play();
  return;
}

function skipNext() {
  var file = album.src.split("/");
  var nextTrackNumber = parseInt(file[file.length - 1]) + 1;
  if ( nextTrackNumber > 7 ) {
    nextTrackNumber = 1;
  }
  var newSource = "audio/"+nextTrackNumber+".mp3";
  trackTitle.innerHTML = getTrackTitle(nextTrackNumber);
  album.src = newSource;
  if (isPlaying == true) {
    album.play();
    isPlaying = true;
    toggleAudio.src = "images/pause_circle.svg";
    return;
  } else {
    album.pause();
    isPlaying = false;
    toggleAudio.src = "images/play_circle.svg";
    return;
  }
}

function skipPrevious() {
  var file = album.src.split("/");
  var previousTrackNumber = parseInt(file[file.length - 1]) - 1;
  if ( previousTrackNumber < 1 ) {
    previousTrackNumber = 7;
  }
  var newSource = "audio/"+previousTrackNumber+".mp3";
  trackTitle.innerHTML = getTrackTitle(previousTrackNumber);
  album.src = newSource;
  if (isPlaying == true) {
    album.play();
    isPlaying = true;
    toggleAudio.src = "images/pause_circle.svg";
    return;
  } else {
    album.pause();
    isPlaying = false;
    toggleAudio.src = "images/play_circle.svg";
    return;
  }
}

function switchCover() {
  var switchCover = document.getElementById("switchCover");
  if (backCover.style.display == '' || backCover.style.display == 'none') {
    frontCover.style.display = 'none';
    backCover.style.display = 'block';
    albumCovers.style.backgroundImage = "url('images/back-cover.jpg')";
    switchCover.innerHTML = 'Front Cover';
  } else {
    backCover.style.display = 'none';
    frontCover.style.display = 'block';
    albumCovers.style.backgroundImage = "url('images/front-cover.jpg')";
    switchCover.innerHTML = 'Back Cover';
  }
}

function toggleInside() {
  if (insidePages.style.display == '' || insidePages.style.display == 'none') {
    albumCovers.style.display = 'none';
    coverNav.style.display = 'none';
    if (insidePages.style.backgroundImage == '') {
      insidePages.style.backgroundImage = "url('images/page1.jpg')";
      insidePages.style.backgroundColor = backgroundColors[currentPage];
      insidePages.style.backgroundBlendMode = backgroundBlendModes[currentPage];
    }
    insideNav.style.display = 'block';
    insidePages.style.display = 'block';
  } else {
    insidePages.style.display = 'none';
    albumCovers.style.display = 'block';
  }
}

function toggleCover() {
    insidePages.style.display = 'none';
    insideNav.style.display = 'none';
    coverNav.style.display = 'block';
    albumCovers.style.display = 'block';
}

function insideNext() {
  var currentID = insidePageList[currentPage];
  var current = document.getElementById(currentID);
  var nextPage = currentPage + 1;
  if (nextPage == insidePageList.length) {
    var nextID = insidePageList[0];
    currentPage = 0;
    insidePages.style.backgroundColor = backgroundColors[currentPage];
    insidePages.style.backgroundBlendMode = backgroundBlendModes[currentPage];
  } else {
    currentPage = currentPage + 1;
    var nextID = insidePageList[nextPage];
    insidePages.style.backgroundColor = backgroundColors[nextPage];
    insidePages.style.backgroundBlendMode = backgroundBlendModes[nextPage];
  }
  var next = document.getElementById(nextID);
  current.style.display = 'none';
  insidePages.style.backgroundImage = "url('images/"+nextID+".jpg')";

  console.log(backgroundColors[nextPage]);
  next.style.display = 'block';
  return;
}
function insidePrevious() {
  var currentID = insidePageList[currentPage];
  var current = document.getElementById(currentID);
  var previousPage = currentPage - 1;
  if (previousPage < 0) {
    var previousID = insidePageList[insidePageList.length - 1];
    currentPage = insidePageList.length - 1;
    insidePages.style.backgroundColor = backgroundColors[currentPage];
    insidePages.style.backgroundBlendMode = backgroundBlendModes[currentPage];
  } else {
    currentPage = currentPage - 1;
    var previousID = insidePageList[previousPage];
    insidePages.style.backgroundColor = backgroundColors[previousPage];
    insidePages.style.backgroundBlendMode = backgroundBlendModes[previousPage];
  }
  var previous = document.getElementById(previousID);
  current.style.display = 'none';
  insidePages.style.backgroundImage = "url('images/"+previousID+".jpg')";
  insidePages.style.backgroundColor = backgroundColors[previousPage];
  insidePages.style.backgroundBlendMode = backgroundBlendModes[previousPage];
  previous.style.display = 'block';
  return;
}

function init() {
  setContainerSize();
  var album = document.getElementById("album");
  var toggleAudio = document.getElementById("toggleAudio");
  var trackTitle = document.getElementById("trackTitle");

  var coverNav = document.getElementById("coverNav");
  var switchCover = document.getElementById("switchCover");
  var toggleInside = document.getElementById("toggleInside");

  var insideNav = document.getElementById("insideNav");
  var insideNext = document.getElementById("insideNext");
  var insidePrevious = document.getElementById("insidePrevious");

  var albumCovers = document.getElementById("albumCovers");
  var frontCover = document.getElementById("frontCover");
  var backCover = document.getElementById("backCover");

  var insidePages = document.getElementById("insidePages");

  window.onresize = setContainerSize;
  albumCovers.style.backgroundImage = "url('images/front-cover.jpg')";
  album.addEventListener("ended", nextTrack,false);
}

var isPlaying = false;
var currentPage = 0;
var insidePageList = ["page1","page2","page3","page4","page5","page6", "page7"];
var backgroundColors = [ "green", "maroon", "aqua", "black", "fuchsia", "olive", "gray"];
var backgroundBlendModes = ["color-burn", "hard-light", "hard-light", "hard-light", "multiply", "hard-light", "darken"];

var trackTitles = ["Brutality Forever","Skirt","MBST","There’s No Reason to Be Alone (Woo Yeah)","Announcement","17 Years","If We Live, We Live to Tread on Kings"];

window.onload = init;
