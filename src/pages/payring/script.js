import carousel from 'Modules/carousel/carousel';


export default function payring() {
    const carouselVariants = document.getElementById('variants');
    window.onload = function() {
        carousel(carouselVariants,{
            // options
            cellAlign: 'left',
            wrapAround: true,
            //autoPlay: 6000,
        });
    }
    const svi = document.getElementById('svi');
    const svib = document.getElementById('svib');
    const sviw = document.getElementById('sviw');
    sviw.onclick = () => { svi.classList.add('sviw')}
    svib.onclick = () => { svi.classList.remove('sviw')}
    const svii = document.getElementById('svii');
    const sviib = document.getElementById('sviib');
    const sviiw = document.getElementById('sviiw');
    sviiw.onclick = () => { svii.classList.add('sviiw')}
    sviib.onclick = () => { svii.classList.remove('sviiw')}

    let tabs = document.querySelectorAll('.tab');
    let buttons = document.querySelectorAll('.accord-tabs li');

    const hideTabs = function (){
        tabs.forEach(e => e.classList.remove('active'))
    }

    const resetButtons = function (){
        buttons.forEach(e => e.classList.remove('active'))
    };

    buttons.forEach((e, i) => {
        e.addEventListener('click', function(){
            hideTabs();
            resetButtons();
            tabs[i].classList.add('active');
            e.classList.add('active');
        })
    })
}
