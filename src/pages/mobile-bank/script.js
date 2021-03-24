//import carousel from 'Modules/carousel/carousel';
import tabs from 'Components/tabs';
import SweetScroll from 'sweet-scroll';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

export default function mbank() {
    const carouselNewin = new Flickity( document.getElementById('newin'), {
        // options
        cellAlign: 'left',
        wrapAround: true,
        autoPlay: 6000,
    } ).resize();
    const carouselControl = new Flickity( document.getElementById('control'), {
        cellAlign: 'left',
        pageDots: false,
        autoPlay: 6000,
        wrapAround: true
    } ).resize();


    window.onload = function() {
        carouselNewin.resize();
        carouselControl.resize();
        if(window.location.hash == '#faq') {
            const sweetScroll = new SweetScroll({ offset: -180 });
            sweetScroll.to('#faq');
        }
    }
    tabs(document.querySelector('.tabs'));
    if(window.location.hash == '#faq') {
        document.querySelector('.tab1').classList.remove('active');
        document.querySelector('.tab3').classList.add('active');
        document.querySelector('li[data-tab="tab1"]').classList.remove('active');
        document.querySelector('li[data-tab="tab3"]').classList.add('active');
    }
}
