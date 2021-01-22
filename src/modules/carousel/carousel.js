/**
 * Carousel
 * https://flickity.metafizzy.co/
 */

import Flickity from 'flickity';
import 'flickity/css/flickity.css';

export default function carousel(carousel, options) {



  // When Carousel exists
  if (carousel) {

    // Flickity - fade in for no FOUC, vanilla JS
    // https://codepen.io/desandro/pen/JGoGpm
    var carouselInit = function () {
      carousel.classList.remove('is-hidden');
      carousel.offsetHeight;
      new Flickity( carousel, options );
    };

    carouselInit();
  }

}
