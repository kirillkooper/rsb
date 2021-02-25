import carousel from 'Modules/carousel/carousel';
import SweetScroll from 'sweet-scroll';
export default function farmer() {
    const carouselDir = document.getElementById('directions');
    window.onload = function() {
        carousel(carouselDir,{
            // options
            //cellAlign: 'left',
            wrapAround: true,
            autoPlay: 6000,
        });
    }
    const banner = document.getElementById('banner');
    const sweetScroll = new SweetScroll();
    banner.onclick = () => { sweetScroll.to('#event');}
}
