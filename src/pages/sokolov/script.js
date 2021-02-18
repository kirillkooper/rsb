export default function sokolov() {
    const uidField = document.getElementById('uid');
    const phoneField = document.getElementById('phone');
    const maskuid = {
        mask: '00000000',
    };
    const maskphone = {
        mask: '+{7} (000) 000-00-00',
    };
    let uidMask = IMask(uidField, maskuid);
    let phoneMask = IMask(phoneField, maskphone);

    new ClipboardJS('.code-copy');
    const codeSubmit = document.getElementById('code-submit');
    const modal = document.getElementById('modal');
    const modalOpenButton = document.getElementById('modal-open');
    const modalCloseButton = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalError = document.getElementById('modal-error');
    const modalCode = document.getElementById('modal-code');
    const modalCodeValue = document.getElementById('code-value');

    modalOpenButton.onclick = () => {modalOpen('text')}
    codeSubmit.onclick = () => {requestCode(); dataLayer.push({'event': 'promo_sokolov_get_code'});  return false;}

    const requestCode = () => {
        let uid = uidMask.unmaskedValue;
        let phone = phoneMask.unmaskedValue;
        if(uid.length !== 8 || phone.length !== 11){
            modalOpen('error', 1);
            return false;
        }
        const data = new FormData();
        data.append("uid", uidMask.unmaskedValue);
        data.append("phone", phoneMask.unmaskedValue);
        console.log(uidMask.unmaskedValue);
        console.log(phoneMask.unmaskedValue);
        fetch('../../ajax/promocodecheck/promocodecheck.php',{
            method: 'post',
            body: data
        }).then(res => res.text()).then(res => codeResult(res));
    }
    const codeResult = (res) => {
        console.log(res);
        if (res === 'wrong'){
            modalOpen('error', 2);
            return false;
        }
        if (res === 'pechalka'){
            modalOpen('error', 3);
            return false;
        }
        modalOpen('code', res);
        dataLayer.push({'event': 'promo_sokolov_code_success'});
    }
    window.onclick = event =>{
        if (event.target === modal || event.target === modalCloseButton) {
            modalClose();
        }
    }
    const modalClose = () => {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }
    const resetModal = () => {
        modalCode.style.display = "none";
        modalText.style.display = "none";
        modalError.style.display = "none";
    }

    const modalOpen = (state, code = '') => {
        resetModal();
        modal.style.display = "block";
        document.body.classList.add('modal-open');
        if(state === 'text'){
            modalTitle.innerText = 'Как найти ID';
            modalText.style.display = "block";
        }else if(state === 'code'){
            modalTitle.innerText = 'Ваш промокод';
            modalCodeValue.innerText = code;
            modalCode.style.display = "block";
        }else if(state === 'error'){
            modalTitle.innerText = 'Ошибка';
            if(code == 1){
                modalError.innerText = 'Проверьте правильность заполнения полей';
            }
            if(code == 2){
                modalError.innerText = 'Указанные ID и номер телефона не совпадают, пожалуйста, проверьте данные';
            }
            if(code == 3){
                modalTitle.innerText = 'Сожалеем...';
                modalError.innerText = 'Кажется, промокодов больше нет :(';
            }
            modalError.style.display = "block";
        }
    }
}
