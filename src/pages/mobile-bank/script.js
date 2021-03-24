import carousel from 'Modules/carousel/carousel';
import tabs from 'Components/tabs';
import SweetScroll from 'sweet-scroll';

export default function mbank() {

    const carouselNewin = document.getElementById('newin');
    const carouselControl = document.getElementById('control');
    window.onload = function() {
        carousel(carouselNewin,{
            // options
            cellAlign: 'left',
            wrapAround: true,
            autoPlay: 6000,
        });
        carousel(carouselControl,{
            cellAlign: 'left',
            pageDots: false,
            autoPlay: 6000,
            wrapAround: true
        });
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
