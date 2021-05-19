import tabs from 'Components/tabs';
import * as basicLightbox from "basiclightbox";
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

export default function urojay() {


    window.onload = function() {
        let carouselControl = new Flickity( document.getElementById('control'), {
            cellAlign: 'left',
            pageDots: false,
            autoPlay: 2000,
            wrapAround: true
        } );
        carouselControl.resize();
    }
    tabs(document.querySelector('.tabs'));

    const bodyPreventScroll = (bool) => {
        document.body.style.overflow = (bool) ? 'hidden' : 'auto';
    }
    const popOptions = {
        onShow: (instance) => {
            bodyPreventScroll(true);
            instance.element().querySelector('.modal-close').onclick = instance.close
        },
        onClose: () => {
            bodyPreventScroll(false);
        }
    };
    const tarifPop = basicLightbox.create(document.getElementById('tarif-pop'), popOptions);
    const way1Pop = basicLightbox.create(document.getElementById('way1-pop'), popOptions);
    const way2Pop = basicLightbox.create(document.getElementById('way2-pop'), popOptions);
    const way3Pop = basicLightbox.create(document.getElementById('way3-pop'), popOptions);
    const plansButton = document.getElementById('plans');
    const way1Button = document.getElementById('wayone');
    const way2Button = document.getElementById('waytwo');
   const way3Button = document.getElementById('waythree');
    plansButton.onclick = () => tarifPop.show();
    way1Button.onclick = () => way1Pop.show();
    way2Button.onclick = () => way2Pop.show();
    way3Button.onclick = () => way3Pop.show();
}
