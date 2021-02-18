import * as Pristine from 'Modules/validator/validator';

export default function inkas() {
    window.onload = function () {

        const form = document.getElementById("inkas-form");
        let defaultConfig = {
            // class of the parent element where the error/success class is added
            classTo: 'form-row',
            errorClass: 'has-error',
            successClass: 'success',
            // class of the parent element where error text element is appended
            errorTextParent: 'error',
            // type of element to create for the error text
            errorTextTag: 'span',
            // class of the error text element
            errorTextClass: 'error-text'
        };
        const ru = {
            required: "Поле необходимо заполнить",
            email: "Укажите правильный email адрес",
            number: "This field requires a number",
            integer: "This field requires an integer value",
            url: "This field requires a valid website URL",
            tel: "This field requires a valid telephone number",
            maxlength: "This fields length must be < ${1}",
            minlength: "This fields length must be > ${1}",
            min: "Minimum value for this field is ${1}",
            max: "Maximum value for this field is ${1}",
            pattern: "Please match the requested format"
        };

        // create the pristine instance

        Pristine.setLocale('ru');
        Pristine.addMessages('ru', ru);

        const pristine = new Pristine(form, defaultConfig, false);

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // check if the form is valid
            const valid = pristine.validate(); // returns true or false
            if(valid){
                const success = (res) => {if(res.status === 'ok'){
                    alert('Заявка принята');
                }else{
                    alert('Ошибка, попробуйте еще раз');
                }};
                const data = new FormData();
                data.append("form_id", 74);
                data.append("form_code", 'collection');
                data.append("name]", form.name.value);
                data.append("region", form.region.value);
                data.append("objects", form.objects.value);
                data.append("phone", form.phone.value);
                data.append("email", form.email.value);
                fetch('https://www.rshb.ru/ajax/request/formnew.php',{
                    method: 'post',
                    body: data
                }).then(res => res.json()).then(res => success(res));
            }
        });
    };
}


