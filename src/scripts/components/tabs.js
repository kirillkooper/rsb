export default function tabs(element) {

    let tabs = element.querySelectorAll('.tab');
    let buttons = element.querySelectorAll('li');

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
