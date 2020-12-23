/*
 * @title App
 * @description Application entry point
 */

// Polyfills
//import 'Utils/_closest.polyfill.js';
//import 'Utils/_matches.polyfill.js';
//import 'Utils/_foreach.polyfill.js';
import 'Utils/_fetch.polyfill.js';
import 'Utils/_promise.polyfill.js';
import 'Utils/_includes.polyfill.js';

// Misc
// Use log() instead of console.log()
 //const log = console.log.bind(console);

// Modules
//import carousel from 'Modules/carousel/carousel';
//import navbar from 'Modules/navbar/navbar';
//import searchOverlay from 'Modules/search-overlay/search-overlay';
//import nps from 'Modules/nps-pop/nps-pop';

// Components
//import collapse from 'Components/collapse.js';
import smoothScroll from 'Components/smooth-scroll';
//import toggleElement from 'Components/toggle-element';

// Pages
import career from 'Pages/career/script';

document.addEventListener('DOMContentLoaded', function() {

  // Modules
  //carousel();
  //navbar();
  //searchOverlay();

  // Components
  //collapse();
  smoothScroll();
  //toggleElement();
  //nps();
    career();

})
