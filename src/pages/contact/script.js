import carousel from 'Modules/carousel/carousel';
import map from 'lodash/map';
import * as basicLightbox from "basiclightbox";
import * as Pristine from 'Modules/validator/validator';
export default function contact() {
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
    const vacancyPop = basicLightbox.create(document.getElementById('vacancy-pop'), popOptions);

    const carouselStory = document.getElementById('story');
    const carouselPhoto = document.getElementById('photos');
    window.onload = function() {
        carousel(carouselStory,{
            // options
            cellAlign: 'left',
            wrapAround: true,
            //autoPlay: 6000,
            adaptiveHeight: true
        });
        carousel(carouselPhoto,{
            // options
            cellAlign: 'left',
            wrapAround: true,
            //autoPlay: 6000,
            adaptiveHeight: true
        });
    }
    const teamList = document.querySelectorAll('.contact-team-card');
    const resetCards = ( ) => {
        map(teamList, (item) => { item.classList.remove('active')})
    };

    map(teamList, (item) => {
        item.addEventListener('click', () => {
            resetCards();
            item.classList.add('active');
        });
        item.addEventListener('mouseover', () => {
            resetCards();
            item.classList.add('active');
        })
    })

    window.cc = window.cc || {
        data: {},
        showData: {},
        cities: {
            petrozavodsk: 'Петрозаводск',
            voronezh: 'Воронеж',
            chelyabinsk: 'Челябинск'
        },
        init: function(city){
            this.getData(this.cities[city]).then(res => {
                this.data = res.entries;
                this.buildList(this.cities[city]);
            });
            this.mountCity(city);
        },
        getData: function (city) {
            return fetch('https://api.bearscience.net/api/collections/get/ccvacncy', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filter: {"city":city},
                    populate: 1,
                })
            }).then(res => res.json());
        },
        buildList: function (){
            const list = document.getElementById('vacancy-list');
            list.innerHTML='';
            map(this.data, (item, index) => {
                list.innerHTML += `<div class="contact-vacancy-item">
                                 <div class="contact-vacancy-item_text">
                                     <h4>${item.title}</h4>

                                     <div class="contact-vacancy-item_options">
                                         <div class="total">${item.salary} руб.</div>
                                     </div>
                                 </div>
                                 <div class="contact-vacancy-item_price">
                                     <div><a class="y-button"  onclick="window.cc.showVacancy(${index})">Смотреть вакансию</a> </div>
                                 </div>
                             </div>`;
            });
        },
        showVacancy: function(id) {
            vacancyPop.show();
            const vacancyText = document.getElementById('vacancy-text');
            vacancyText.innerHTML = `<h2>${this.data[id].title}</h2>
            <div>
             ${this.data[id].text}
            </div>
            <div class="form-wrap">
                <div class="form">
                    <form id="vacancy-form">
                    <h2 style="margin-top: 2em;">Откликунуться на вакансию</h2>
                        <div class="form-row">
                            <label>Вас зовут</label>
                            <input type="text" name="name" required placeholder="Иван">
                            <div class="error"></div>
                        </div>
                        <div class="form-row">
                            <label>Телефон</label>
                            <input type="text" name="phone" required placeholder="+7 (900) 000-00-00">
                            <div class="error"></div>
                        </div>
                        <div class="form-row">
                            <label>Email</label>
                            <input type="text" name="email" required placeholder="email@rshb.ru">
                            <div class="error"></div>
                        </div>
                        <div class="form-row">
                             <input type="checkbox" name="condition" id="condition" required data-pristine-required-message="You must accept the terms and conditions">
                             <label for="condition">Согласие на обработку персональных данных</label>
                             <div class="error"></div>
                        </div>
                            <div class="form-row">
                                <button class="y-button">Отправить</button>
                            </div>
                    </form>
                </div>
            </div>`;
            this.buildValid(this.data[id].title, this.data[id].city);
        },
        buildValid: function (title, city){
            const form = document.getElementById("vacancy-form");
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
                    data.append("form_id", 76);
                    data.append("form_code", 'jobpromo');
                    data.append("city", `${city}`);
                    data.append("vacancy", `${title}`);
                    data.append("name", form.name.value);
                    data.append("phone", form.phone.value);
                    data.append("email", form.email.value);
                    fetch('https://www.rshb.ru/ajax/request/formnew.php',{
                        method: 'post',
                        body: data
                    }).then(res => res.json()).then(res => success(res));
                }
            });
        },
        mountCity: function (city){
            const main = document.getElementById('main');
            const topMain = document.getElementById('top-city');
            const vacCity = document.getElementById('vacancy-city');
            const contPetrozavodsk = document.getElementById('petrozavodsk-cont');
            const contVoronezh = document.getElementById('voronezh-cont');
            const contChelyabinsk = document.getElementById('chelyabinsk-cont');

            main.classList.add(city);

            if(city === 'petrozavodsk'){
                topMain.innerText = 'Петрозаводск';
                vacCity.innerText = 'Петрозаводске';
                contPetrozavodsk.style.display = 'block';
            }
            if(city === 'voronezh'){
                topMain.innerText = 'Воронеж';
                vacCity.innerText = 'Воронеже';
                contVoronezh.style.display = 'block';
            }
            if(city === 'chelyabinsk'){
                topMain.innerText = 'Челябинск';
                vacCity.innerText = 'Челябинске';
                contChelyabinsk.style.display = 'block';
            }
        }
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const city = urlParams.get('city') || 'petrozavodsk';
    window.cc.init(city);

}
