/*
 * @title App
 * @description Application entry point
 */

// Polyfills
import 'Utils/_closest.polyfill.js';
import 'Utils/_matches.polyfill.js';
import 'Utils/_foreach.polyfill.js';
import 'Utils/_fetch.polyfill.js';
import 'Utils/_promise.polyfill.js';
import 'Utils/_includes.polyfill.js';
import 'Utils/_array.from.polyfill.js';
import 'Utils/_object.assign.js';
import 'Utils/_urlparams.polyfill.js';
import 'Utils/_template.polyfill.js';


// Misc
// Use log() instead of console.log()
 //const log = console.log.bind(console);

// Modules
//import navbar from 'Modules/navbar/navbar';
//import searchOverlay from 'Modules/search-overlay/search-overlay';
//import nps from 'Modules/nps-pop/nps-pop';

// Components
//import collapse from 'Components/collapse.js';
import smoothScroll from 'Components/smooth-scroll';
//import toggleElement from 'Components/toggle-element';
import pop from 'Components/pop';

// Pages
//import career from 'Pages/career/script';
//import sokolov from 'Pages/sokolov/script';
//import mbank from 'Pages/mobile-bank/script';
//import payring from 'Pages/payring/script';
//import inkas from 'Pages/inkasation/script';
//import farmer from 'Pages/farmer/script';
import contact from 'Pages/contact/script';
//import broker from 'Pages/broker/script';


document.addEventListener('DOMContentLoaded', function() {

  // Modules
  //carousel();
  //navbar();
  //searchOverlay();

  // Components
  //collapse();
  smoothScroll();
  //toggleElement();
  pop();

  // Pages
  //nps();
  //career();
  //mbank();
  //sokolov();
  //payring();
  //inkas();
  //farmer();
  contact();
  //broker();
})
