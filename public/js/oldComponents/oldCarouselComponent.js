import { detectSwipe } from '../utils/detectSwipe'
class CarouselComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.carouselsIndex = {};
    this.isProcessingSlide = false;
    this.__setDOMVariables();
    this.__bindDOMEvents();
  }
  __setDOMVariables() {
    this.carousels = document.getElementsByTagName('carousel');
  }
  __handleCarouselSwipe(el, direc) {
    let carousel = this.carouselsIndex[el.id],
        currentSlideIdx = direc === 'r' ? carousel.currentSlideIdx + 1 : carousel.currentSlideIdx - 1;
    if (currentSlideIdx === carousel.numberOfCarouselSlides) {
      currentSlideIdx = 0;
    } else if (currentSlideIdx < 0) {
      currentSlideIdx = carousel.numberOfCarouselSlides - 1;
    }
    this.__progressSlide(currentSlideIdx, carousel, direc);
  }
  __bindDOMEvents() {
    let carouselMeatballsContainer,
        carouselMeatballs,
        carouselId,
        carouselSlides,
        currentCarousel,
        currentSlide,
        currentMeatball,
        carouselSlideContainer,
        numberOfCarouselSlides,
        carouselSlideImages = [];
    for (let i = 0; i < this.carousels.length; i++) {
      currentCarousel = this.carousels[i];
      carouselId = currentCarousel.id;
      carouselSlides = currentCarousel.getElementsByClassName('translationllc__carousel__slides__slide');
      numberOfCarouselSlides = carouselSlides.length;
      carouselSlideContainer = currentCarousel.getElementsByClassName('translationllc__carousel__slides')[0];
      currentSlide = carouselSlides[0];
      currentSlide.style.left = 0;
      currentSlide.style.opacity = 1;
      carouselMeatballsContainer = currentCarousel.getElementsByClassName('translationllc__carousel__slide-meatballs')[0];
      detectSwipe(carouselSlideContainer, this.__handleCarouselSwipe.bind(this));
      carouselMeatballs = carouselMeatballsContainer.getElementsByClassName('translationllc__carousel__slide-meatballs__meatball');
      currentMeatball = carouselMeatballs[0];
      for (let j = 0; j < carouselSlides.length; j++) {
        carouselSlideImages.push(carouselSlides[j].getElementsByTagName('img')[0].src);
      }
      this.carouselsIndex[carouselId] = {
        numberOfCarouselSlides,
        carouselSlideContainer,
        currentSlide,
        carouselMeatballs,
        currentMeatball,
        carouselSlideImages,
        currentSlideIdx: 0
      };
      while (carouselSlides.length > 1) {
        carouselSlides[1].remove();
      }
      currentMeatball.classList.add('translationllc__active-meatball');
      carouselMeatballsContainer.addEventListener(window.clickevent, this.__meatballNavigate.bind(this));
    }
  }
  __meatballNavigate(evt) {
    let meatballElement = evt.target,
        meatballNumber = evt.target.dataset['meatballNumber'],
        carouselId,
        carousel,
        currentMeatball,
        direction,
        currentSlide;
    if (meatballNumber) {
      carouselId = meatballElement.id.split('-')[2],
      carousel = this.carouselsIndex[carouselId];
      direction = parseInt(meatballNumber) > carousel.currentSlideIdx ? 'r' : 'l';
      this.__progressSlide(meatballNumber, carousel, direction);
    }
  }
  __progressSlide(slideNumber, carousel, direction) {
    let nextMeatball = carousel.carouselMeatballs[slideNumber],
        // nextSlide = carousel.carouselSlides[slideNumber],
        currentSlide = carousel.currentSlide,
        currentSlideImg = currentSlide.getElementsByTagName('img')[0],
        newSlide,
        newSlideImg,
        slideInClass = direction === 'r' ? 'translationllc__carousel__slides__slide-in--right' : 'translationllc__carousel__slides__slide-in--left';
    if (direction === 'r') {
      currentSlide.style.left = '1000px';
    } else {
      currentSlide.style.left = '-1000px';
    }
    window.setTimeout(() => {
      if (!this.isProcessingSlide) {
        this.isProcessingSlide = true;
        currentSlide.remove();
        newSlide = document.createElement('div');
        newSlideImg = document.createElement('img');
        newSlideImg.setAttribute('src', carousel.carouselSlideImages[slideNumber]);
        newSlide.append(newSlideImg);
        carousel.carouselSlideContainer.append(newSlide);
        newSlide.classList.add('translationllc__carousel__slides__slide', slideInClass);
        newSlideImg.classList.add('translationllc__carousel__slides__slide__image');
        window.setTimeout(() => {
          newSlide.style.left = 0;
          this.isProcessingSlide = false;
        }, 20);
        carousel.currentSlide = newSlide;
      }
    }, 500);
    // currentSlideImg.src = carousel.carouselSlideImages[slideNumber];
    // if (direction === 'r') {
    //   currentSlide.style.left = '1000px';
    //   nextSlide.style.left = '-1000px';
    // } else {
    //   currentSlide.style.left = '-1000px';
    //   nextSlide.style.left = '1000px';
    // }
    // window.setTimeout(() => {
    //   nextSlide.style.left = 0;
    //   nextSlide.style.opacity = 1;
    // });
    // window.setTimeout(() => {
    //   currentSlide.style.opacity = 0;
    //   currentSlide.style.left = '';
    // }, 250);
    carousel.currentMeatball.classList.remove('translationllc__active-meatball');
    nextMeatball.classList.add('translationllc__active-meatball');
    // carousel.currentSlide = nextSlide;
    carousel.currentMeatball = nextMeatball;
    carousel.currentSlideIdx = parseInt(slideNumber);
  }
}
export const carouselComponent = new CarouselComponent();
