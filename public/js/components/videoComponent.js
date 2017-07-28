import { EventBus } from '../flux/eventBus'
import { DeviceActions } from '../flux/actionCreators/deviceActions'
class VideoComponent {
  constructor() {
    this.__init()
  }
  __init() {
    this.tllcVideoIndex = {};
    this.tllcVideoContainersIndex = {};
    this.tllcVideoSvgOverlaysIndex = {};
    this.tllcVideoButtonsIndex = {};
    this.tllcBackgroundImageUrlsIndex = {};
    this.DOMeventsBound = false;
    this.currentVideo;
    this.currentVideoId;
    this.fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    this.__setDOMVariables();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.tllcVideos = document.getElementsByTagName('tllcvideo');
    this.tllcVideoButtons = document.getElementsByClassName('translationllc__video__play-button');
    this.requestFullscreenButton = document.getElementById('requestFullscreenButton');
  }
  __bindDOMEvents(detectionData) {
    let video,
        videoId,
        videoButton,
        videoFigure;
    for (let i = 0; i < this.tllcVideos.length; i++) {
      video = this.tllcVideos[i];
      videoFigure = video.getElementsByTagName('figure')[0];
      this.__bindVideoEvents(video.getElementsByTagName('video')[0]);
      videoId = video.id;
      this.tllcVideoContainersIndex[videoId] = videoFigure;
      this.tllcVideoSvgOverlaysIndex[videoId] = video.getElementsByTagName('tllcvideoSvgOverlay')[0];
      this.tllcBackgroundImageUrlsIndex[videoId] = window.getComputedStyle(videoFigure, null)['background-image'];
      this.tllcVideoIndex[videoId] = video;
    }
    //refactor this loop to find play button from video tag
    for (let j = 0; j < this.tllcVideoButtons.length; j++) {
      videoButton = this.tllcVideoButtons[j];
      this.tllcVideoButtonsIndex[videoButton.id] = videoButton;
      videoButton.addEventListener('click', this.__handleVideoControls.bind(this));
    }
    if (!detectionData.isDesktop) {
      this.requestFullscreenButton.addEventListener('click', this.__handleFullScreen.bind(this));
    }
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
  }
  __bindVideoEvents(video) {
    if (video) {
      video.addEventListener('play', (evt) => {
        DeviceActions.videoPlayed();
      });
      video.addEventListener('ended', (evt) => {
        this.__resetVideoState(video.id);
      });
      video.addEventListener('webkitendfullscreen', (evt) => {
        video.pause();
        this.__resetVideoState(video.id);
      });
      video.addEventListener('pause', (evt) => {
        let currentTime = evt.target.currentTime;
        window.setTimeout(() => {
          if (evt.target.paused) {
            if (currentTime === evt.target.currentTime) {
              this.__resetVideoState(video.id);
            }
          }
        }, 500);
      }, false);
    }
  }
  __resetVideoState(id) {
    let video = this.tllcVideoIndex[id].getElementsByTagName('video')[0],
        button = this.tllcVideoButtonsIndex[id],
        figureElement = this.tllcVideoContainersIndex[id];
    figureElement.classList.remove('translationllc__video__container--work-video-hidden');
    if (this.isBigIpad) {
      figureElement.classList.remove('translationllc__video__container--big-ipad');
    }
    button.style.display = 'block';
    video.style.opacity = 0;
    if (!this.isDesktop && !this.isSafari) {
      this.__handleFullScreen();
    }
  }
  __detection(detectionData) {
    this.isMobile = detectionData.isMobile;
    this.isDesktop = detectionData.isDesktop;
    this.isSafari = detectionData.isSafari;
    this.isBigIpad = detectionData.isBigIpad;
    if (!detectionData.isDesktop) {
      if (!this.changeListenerAdded) {
        this.eventBus.addChangeListener('fullscreenChange', this.__handleFullscreenChange.bind(this));
      }
      this.changeListenerAdded = true;
    }
    if (!this.DOMeventsBound) {
      this.__bindDOMEvents(detectionData);
      this.DOMeventsBound = true;
    }
  }
  __handleFullscreenChange() {
    if (!this.__isFullScreen()) {
      this.__setFullscreenData(false);
    }
  }
  __handleFullScreen() {
    if (this.currentVideoId) {
      let videoContainer = this.tllcVideoContainersIndex[this.currentVideoId];
      if (this.__isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        this.__setFullscreenData(false);
      } else {
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        this.__setFullscreenData(true);
      }
    }
  }
  __setFullscreenData(state) {
    if (state) {
      this.tllcVideoIndex[this.currentVideoId].getElementsByTagName('video')[0].setAttribute('controls', true);
    }
    this.tllcVideoContainersIndex[this.currentVideoId].setAttribute('data-fullscreen', !!state);
  }
  __isFullScreen() {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
  }
  __handleVideoControls(evt) {
    let buttonId = evt.target.id,
        video = this.tllcVideoIndex[buttonId].getElementsByTagName('video')[0],
        figureElement = this.tllcVideoContainersIndex[buttonId],
        svgOverlay = this.tllcVideoSvgOverlaysIndex[buttonId];
    evt.target.style.display = 'none';
    video.style.opacity = 1;
    figureElement.classList.add('translationllc__video__container--work-video-hidden');
    this.currentVideoId = buttonId;
    if (svgOverlay) {
      svgOverlay.style.display = 'none';
    }
    if (this.isBigIpad) {
      video.classList.remove('translationllc__video__container__video--work-video');
      video.classList.add('translationllc__video__container__video--work-video--big-ipad');
      figureElement.classList.add('translationllc__video__container--big-ipad');
    }
    if (!this.isDesktop) {
      this.requestFullscreenButton.click();
    } else {
      let widthUnit = window.innerWidth / 16,
          height = widthUnit * 7,
          videoElement = this.tllcVideoIndex[buttonId].getElementsByTagName('video')[0];
      videoElement.style.height = `${height}px`;
      videoElement.setAttribute('controls', true);
    }
    video.play();
  }
}
export const videoComponent = new VideoComponent();
