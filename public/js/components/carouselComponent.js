import { EventBus } from '../flux/eventBus'
import { shuffleArray } from '../utils/shuffleArray'
import { isElementInViewport } from '../utils/isElementInViewport'
class CarouselComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.animationInterval = null;
    this.minorsCarouselImagesLoaded = false;
    this.restartMinorsCarousel = false;
    this.minorsCarouselImageUrlCounter = 0;
    this.introCarouselImageUrlCounter = 0;
    this.carouselImages = {
      minorsCarousel: {},
      introCarousel: {}
    };
    this.shuffledIntroUrlsMobile;
    this.shuffledIntroUrlsDesktop;
    this.loadedImages = [];
    this.mobileTranslatorUrls = [
      '1_mobile.jpg',
      '2_mobile.jpg',
      '3_mobile.jpg',
      '4_mobile.jpg',
      '5_mobile.jpg',
      'WORK_MOBILE[3].jpg'
    ];
    this.mobileImageUrls = [
      'WORK_MOBILE[1].jpg',
      'WORK_MOBILE[2].jpg',
      'WORK_MOBILE[4].jpg',
      'WORK_MOBILE[5].jpg',
      'WORK_MOBILE[6].jpg',
      'WORK_MOBILE[7].jpg',
      'WORK_MOBILE[8].jpg',
      'WORK_MOBILE[9].jpg',
      'WORK_MOBILE[10].jpg',
      '6_mobile.jpg',
      '7_mobile.jpg',
      '8_mobile.jpg',
      '9_mobile.jpg',
      '10_mobile.jpg',
      '11_mobile.jpg',
      '12_mobile.jpg',
      '13_mobile.jpg',
      '14_mobile.jpg',
      '15_mobile.jpg',
      'Gif_Mobile_1.jpg',
      'Gif_Mobile_3.jpg',
      'Gif_Mobile_4.jpg',
      'Gif_Mobile_5.jpg',
      'Gif_Mobile_6.jpg',
      'Gif_Mobile_8.jpg',
      'Gif_Mobile_10.jpg',
      'Gif_Mobile_11.jpg',
      'Gif_Mobile_15.jpg',
      'Gif_Mobile_17.jpg',
      'Gif_Mobile_18.jpg',
      'Translation_History_alt1_mobile.jpg',
      'CHAMPS_MOBILE[2].jpg',
      'NBA_MOBILE[3].jpg',
      'DSW_MOBILE[1].jpg',
      'DSW_MOBILE[2].jpg',
      'DSW_MOBILE[3].jpg',
      'DSW_MOBILE[4].jpg',
      'DSW_MOBILE[5].jpg',
      'DSW_MOBILE[6].jpg',
      'VCF_alt_desktop.jpg'
    ];
    this.minorsMobileImageUrls = [
      'barri-minor.jpg',
      'Emcee_Mobile.jpg',
      'able-minor.jpg',
      'carissa-minor.jpg',
      'meryl-minor.jpg',
      'sandi-minor.jpg',
      'Artist_Muralist_mobile_1.jpg',
      'Craig_Drummer_mobile.jpg',
      'carolina_basketball_minor.jpg',
      'record-producer-minor.jpg',
      'urban-explorer-minor.jpg',
      'photographer-minor.jpg',
      'jeremy_electric_guitar_mobile.jpg',
      'edwin_magfed_paintball_mobile.jpg',
      'nichelle_poetry_mobile.jpg',
      'karl_dancing_mobile.jpg',
      'jared_youth_mentor_mobile.jpg',
      'Tony_Comic_Artist_mobile.jpg'
    ];
    this.minorsMonikers = [
      'Brazilianist',
      'Emcee',
      'Collage Artist',
      'Sculptor',
      'Activist',
      'Yogi',
      'Artist & Muralist',
      'Drummer',
      'Carolina Basketball',
      'Record Producer',
      'Urban Explorer',
      'Photographer',
      'Bass',
      'Magfed Paintball',
      'Poetry',
      'Dancer',
      'Youth Mentor',
      'Comic Artist'
    ];
    this.minorsDesktopImageUrls = [
      'barri-minor-desktop.jpg',
      'joel-minor-desktop.jpg',
      'able-minor-desktop.jpg',
      'carissa-minor-desktop.jpg',
      'meryl-minor-desktop.jpg',
      'sandi-minor-desktop.jpg',
      'luis-minor-desktop.jpg',
      'craig_drummer.jpg',
      'carolina-basketball-minor-desktop.jpg',
      'record-producer-minor-desktop.jpg',
      'urban-explorer-minor-desktop.jpg',
      'photographer-minor-desktop.jpg',
      'jeremy_upright_electric_guitar_desktop.jpg',
      'edwin_magfed_paintball.jpg',
      'nichelle_poetry_desktop.jpg',
      'karl_dancer_desktop.jpg',
      'jared_youth_mentor_desktop.jpg',
      'tony_comic_artist_desktop.jpg'
    ];
    this.desktopTranslatorUrls = [
      '1_desktop.jpg',
      '2_desktop.jpg',
      '3_desktop.jpg',
      '4_desktop.jpg',
      '5_desktop.jpg',
      'WORK_DESKTOP[3].jpg'
    ];
    this.desktopImageUrls = [
      'gif_desktop_1_low.jpg',
      'Gif_Desktop_3.jpg',
      'Gif_Desktop_4.jpg',
      'Gif_Desktop_5.jpg',
      'Gif_Desktop_6.jpg',
      'Gif_Desktop_8.jpg',
      'Gif_Desktop_10.jpg',
      'Gif_Desktop_11.jpg',
      'Gif_Desktop_15.jpg',
      'Gif_Desktop_17.jpg',
      '6_desktop.jpg',
      '7_desktop.jpg',
      '8_desktop.jpg',
      '9_desktop.jpg',
      '10_desktop.jpg',
      '11_desktop.jpg',
      '12_desktop.jpg',
      '13_desktop.jpg',
      '14_desktop.jpg',
      '15_desktop.jpg',
      'WORK_DESKTOP[1].jpg',
      'WORK_DESKTOP[2].jpg',
      'WORK_DESKTOP[4].jpg',
      'WORK_DESKTOP[5].jpg',
      'WORK_DESKTOP[6].jpg',
      'WORK_DESKTOP[7].jpg',
      'WORK_DESKTOP[8].jpg',
      'WORK_DESKTOP[9].jpg',
      'WORK_DESKTOP[10].jpg',
      'CHAMPS_DESKTOP[2].jpg',
      'NBA_DESKTOP[3].jpg',
      'Translation_History_alt1_desktop.jpg',
      'DSW_DESKTOP[1].jpg',
      'DSW_DESKTOP[2].jpg',
      'DSW_DESKTOP[3].jpg',
      'DSW_DESKTOP[4].jpg',
      'DSW_DESKTOP[5].jpg',
      'DSW_DESKTOP[6].jpg',
      'VCF_alt_desktop.jpg'
    ];
    this.__setDOMVariables();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.minorsCarousel = document.getElementById('minorsCarousel');
    this.translationIntro = document.getElementById('translationllcIntro');
    this.translationllcAnimationDesktop = document.getElementById('translationllcAnimationDesktop');
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('endAnimation', this.__endAnimation.bind(this));
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
    // this.eventBus.addChangeListener('orientationChange', this.__orientationChange.bind(this));
    // this.eventBus.addChangeListener('resize', this.__resize.bind(this));
  }
  __initiateCarousel(detectionData) {
    this.__createAnimationInterval('intro', detectionData, this.minorsCarousel, this.shuffledIntroUrlsMobile || this.shuffledIntroUrlsDesktop);
  }
  __detection(data) {
    this.detectionData = data;
    if (!this.introCarouselLoaded) {
      this.__preloadImages(data, 'intro').then((values) => {
        this.__initiateCarousel(data);
        this.__initiateMinorsCarousel(data);
      });
    }
    this.__resize(data);
    this.__orientationChange(data);
    this.introCarouselLoaded = true;
  }
  __resize(data) {
    let bodyClientRect = document.getElementsByTagName('body')[0].getBoundingClientRect();
    this.loadedImages.forEach((imageElement) => {
      if (data.useHeightAspectRatio) {
        imageElement.classList.add('translationllc__intro__carousel--height-aspect-ratio');
        imageElement.classList.remove('translationllc__intro__carousel--ipad');
      } else {
        imageElement.classList.remove('translationllc__intro__carousel--height-aspect-ratio');
        imageElement.classList.add('translationllc__intro__carousel--ipad');
      }
    });
  }
  __orientationChange(data) {
    this.loadedImages.forEach((image) => {
      if (data.isLandscape) {
        if (data.isIpad && !data.isBigIpad) {
          return;
        } else {
          image.classList.remove('translationllc__intro__carousel--height-aspect-ratio');
          image.classList.add('translationllc__intro__carousel--ipad');
        }
      } else if (data.orientation === 0 && !this.detectionData.isIpad) {
        image.classList.remove('translationllc__intro__carousel--ipad');
        image.classList.add('translationllc__intro__carousel--height-aspect-ratio');
      } else if (data.orientation === 0 && this.detectionData.isBigIpad) {
        image.classList.remove('translationllc__intro__carousel--height-aspect-ratio');
        image.classList.add('translationllc__intro__carousel--ipad');
      }

    });
  }
  __selectImageUrls(detectionData, carouselType) {
    if (detectionData.isDesktop || detectionData.isLandscape) {
      return this.minorsDesktopImageUrls;
    } else {
      return this.minorsMobileImageUrls;
    }
  }
  __incrementImage(imageUrls, carouselType) {
    let previousCount = this[`${carouselType}CarouselImageUrlCounter`],
        count;
    this[`${carouselType}CarouselImageUrlCounter`]++;
    count = this[`${carouselType}CarouselImageUrlCounter`];
    if (imageUrls && count > imageUrls.length - 1) {
      this[`${carouselType}CarouselImageUrlCounter`] = 0;
      count = 0;
    }
    if (carouselType !== 'minors') {
      this.carouselImages[`${carouselType}Carousel`][previousCount]['image'].style.display = 'none';
      this.carouselImages[`${carouselType}Carousel`][count]['image'].style.display = 'block';
    } else {
      this.carouselImages[`${carouselType}Carousel`][previousCount]['monikerElement'].style.display = 'none';
      this.carouselImages[`${carouselType}Carousel`][previousCount]['image'].style.display = 'none';
      this.carouselImages[`${carouselType}Carousel`][count]['monikerElement'].style.display = 'block';
      this.carouselImages[`${carouselType}Carousel`][count]['image'].style.display = 'block';
    }
  }
  __createAnimationInterval(carouselType, detectionData, carouselElement, imageUrls) {
    if (carouselType === 'minors') {
      let useLandscape = detectionData.orientation === null || detectionData.orientation === 90;
      this.carouselAnimationInterval = window.setInterval(() => {
        this.__incrementImage(imageUrls, 'minors');
      }, 500);
    } else {
      this.animationInterval = window.setInterval(() => {
        this.__incrementImage(imageUrls, 'intro');
      }, 500);
    }
  }
  __initiateMinorsCarousel(detectionData) {
    if (!this.minorsCarouselImagesLoaded) {
      this.__preloadImages(detectionData, 'minors').then((values)=> {
        let imageUrls = this.__selectImageUrls(detectionData, 'minors');
        this.__createAnimationInterval('minors', detectionData, this.minorsCarousel, imageUrls);
        this.minorsCarouselInitiated = true;
      });
    }
    this.minorsCarouselImagesLoaded = true;
  }
  __imagePromiseClosure(carouselType, image, i, monikerElement) {
    this.carouselImages[carouselType][i] = {
      image,
      monikerElement
    }
  }
  __createImagePromises(carouselType, fixWidth, url, i) {
    let image = new Image(),
        monikerElementDiv,
        monikerElementHeader,
        imagePromise = new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = resolve;
          image.src = `../assets/${url}`;
          image.style.display = 'none';
          this.loadedImages.push(image);
          monikerElementDiv = document.createElement('div');
          monikerElementHeader = document.createElement('p');
          monikerElementDiv.style.display = 'none';
          monikerElementHeader.textContent = this.minorsMonikers[i];
          monikerElementDiv.classList.add('translationllc__main__culture__emcee__moniker');
          monikerElementDiv.appendChild(monikerElementHeader);
          this.__imagePromiseClosure(carouselType, image, i, monikerElementDiv);
          if (carouselType === 'minorsCarousel') {
            if (fixWidth) {
              image.classList.add('translationllc__intro__carousel--height-aspect-ratio');
            } else {
              image.classList.add('translationllc__intro__carousel--ipad');
            }
            image.classList.add('translationllc__carousel--minors');
            this.minorsCarousel.appendChild(image);
            this.minorsCarousel.appendChild(monikerElementDiv);
          } else {
            image.classList.add('translationllc__carousel--intro');
            if (fixWidth) {
              image.classList.add('translationllc__intro__carousel--ipad');
            } else {
              image.classList.add('translationllc__intro__carousel--height-aspect-ratio');
            }
            if (!this.detectionData.isDesktop || (this.detectionData.isIpad && this.detectionData.isLandscape)) {
              this.translationIntro.appendChild(image);
            } else {
              this.translationllcAnimationDesktop.appendChild(image);
            }
          }
        });
      this.imagePromises.push(imagePromise);
  }
  __preloadImages(detectionData, carouselType) {
    this.imagePromises = [];
    if (carouselType === 'intro') {
      if (!detectionData.isIpad && detectionData.orientation === 0 && !detectionData.isLandscape) {
        this.shuffledIntroUrlsMobile = shuffleArray(this.mobileTranslatorUrls, this.mobileImageUrls);
        if (detectionData.isIpad) {
          this.shuffledIntroUrlsMobile.forEach(this.__createImagePromises.bind(this, 'introCarousel', 'fixWidth'));
        } else {
          this.shuffledIntroUrlsMobile.forEach(this.__createImagePromises.bind(this, 'introCarousel', null));
        }
      } else if (detectionData.isLandscape) {
        this.shuffledIntroUrlsDesktop = shuffleArray(this.desktopTranslatorUrls, this.desktopImageUrls);
        if (detectionData.useHeightAspectRatio) {
          this.shuffledIntroUrlsDesktop.forEach(this.__createImagePromises.bind(this, 'introCarousel', null));
        } else {
          this.shuffledIntroUrlsDesktop.forEach(this.__createImagePromises.bind(this, 'introCarousel', 'fixWidth'));
        }
      } else if (detectionData.isIpad || detectionData.isDesktop) {
        this.shuffledIntroUrlsDesktop = shuffleArray(this.desktopTranslatorUrls, this.desktopImageUrls);
        if (detectionData.useHeightAspectRatio) {
          this.shuffledIntroUrlsDesktop.forEach(this.__createImagePromises.bind(this, 'introCarousel', null));
        } else {
          this.shuffledIntroUrlsDesktop.forEach(this.__createImagePromises.bind(this, 'introCarousel', 'fixWidth'));
        }
      }
    } else {
      if (!detectionData.isDesktop) {
        this.minorsMobileImageUrls.forEach(this.__createImagePromises.bind(this, 'minorsCarousel', null));
      } else {
        this.minorsDesktopImageUrls.forEach(this.__createImagePromises.bind(this, 'minorsCarousel', 'fixWidth'));
      }
    }
    return Promise.all(this.imagePromises);
  }
  __endAnimation() {
    window.clearInterval(this.animationInterval);
  }
}
export const carouselComponent = new CarouselComponent();
