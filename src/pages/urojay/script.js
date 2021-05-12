import tabs from 'Components/tabs';
import * as basicLightbox from "basiclightbox";
export default function urojay() {
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
    const plansButton = document.getElementById('plans');
    const way1Button = document.getElementById('wayone');
    plansButton.onclick = () => tarifPop.show();
    way1Button.onclick = () => way1Pop.show();
}
