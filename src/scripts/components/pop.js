import map from 'lodash/map'
import * as basicLightbox from 'basiclightbox';
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

export default function pop() {
 const popUps = document.querySelectorAll('.js-pop');
 if(popUps.length > 0){
     map(popUps, (item) => {
        item.pop = basicLightbox.create(document.querySelector(`#${item.dataset.pop}`), popOptions);
        item.onclick = item.pop.show;
     })

 }
}
