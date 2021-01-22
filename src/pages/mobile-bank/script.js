import carousel from 'Modules/carousel/carousel';
import tabs from 'Components/tabs';

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
            prevNextButtons: false,
            pageDots: false,
            autoPlay: 6000,
            wrapAround: true
        });
    }
    tabs(document.querySelector('.tabs'));
}
