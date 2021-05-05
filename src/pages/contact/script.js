import carousel from 'Modules/carousel/carousel';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
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
    window.dataLayer = window.dataLayer || [];
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
            autoPlay: 6000,
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
            this.getData().then(res => {
                this.data = sortBy(res.entries,[function(o) { return o.city; }]);
                this.buildList(this.cities[city]);
            });
            this.mountCity(city);
        },
        currentVacancy: {},
        sendPush: function (id, city, action){
            const whatType = (id, action) => {
                if(['604f23e6373933bc2200007f', '604f250b39393940330002ff', '604f252831396418b60000a2'].includes(id)){
                    return (action === 'show') ? 'job_contact_telemarketing' : 'job_contact_telemarketing_response';
                }
                if(['604f23853933390c2d00008d', '604f2396626364ef680003e5'].includes(id)){
                    return (action === 'show') ? 'job_contact_support' : 'job_contact_support_response';
                }
                return (action === 'show') ? 'job_contact_new' : 'job_contact_new_response';
            };

            dataLayer.push({'event': whatType(id, action), 'vacancy_city': city});

        },
        getData: function () {
            return fetch('https://api.bearscience.net/api/collections/get/ccvacncy', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    populate: 1,
                })
            }).then(res => res.json());
        },
        buildList: function (city){
            const list = document.getElementById('vacancy-list');
            list.innerHTML='';
            if (city) {
                map(this.data, (item, index) => {
                    if(city == item.city){
                        list.innerHTML += `<div class="contact-vacancy-item">
                                 <div class="contact-vacancy-item_text withcity">
                                     <h4>${item.title}</h4>
                                     <div>${item.salary}</div>
                                 </div>
                                 <div class="contact-vacancy-item_price">
                                     <div><a class="y-button"  onclick="window.cc.showVacancy(${index})">Смотреть вакансию</a> </div>
                                 </div>
                             </div>`;
                    }
                });
            } else {
                map(this.data, (item, index) => {
                    list.innerHTML += `<div class="contact-vacancy-item">
                                 <div class="contact-vacancy-item_text withcity">
                                    <div style="font-size: .85em; color: #666;">${item.city}</div>
                                     <h4>${item.title}</h4>
                                     <div class="">${item.salary}</div>
                                 </div>
                                 <div class="contact-vacancy-item_price">
                                     <div><a class="y-button"  onclick="window.cc.showVacancy(${index})">Смотреть вакансию</a> </div>
                                 </div>
                             </div>`;
                });
            }
        },
        showVacancy: function(id) {
            vacancyPop.show();
            const vacancyText = document.getElementById('vacancy-text');
            this.currentVacancy = {
                'id' : this.data[id]._id,
                'city' : this.data[id].city
            }
            this.sendPush(this.currentVacancy.id, this.currentVacancy.city, 'show');

            vacancyText.innerHTML = `<h2>${this.data[id].title}</h2>
            <div>
             ${this.data[id].text}
            </div>
            <div class="form-wrap">
                <div class="form">
                    <form id="vacancy-form">
                    <h2 style="margin-top: 2em;">Откликнуться на вакансию</h2>
                        <div class="form-row">
                            <label>Вас зовут</label>
                            <input type="text" name="name" required placeholder="Имя">
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
                        this.sendPush(this.currentVacancy.id, this.currentVacancy.city, 'submit');
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
        mountTabs: function(){
            let tabs = document.querySelectorAll('.contact-vacancy-tabs ul li');
            const resetTabs = ( ) => {
                map(tabs, (item) => { item.classList.remove('active')});
            };
            map(tabs, (item) => { item.addEventListener('click', function (){
                resetTabs();
                this.classList.add('active');
                window.cc.buildList(this.dataset.tab);
                //console.log(this.dataset.tab);
            })})
            console.log(tabs);
        },
        mountCity: function (city){
            const main = document.getElementById('main');
            const topMain = document.getElementById('top-city');
            const adresses = document.getElementById('adresses');
            const shares = document.getElementById('shares');
            const vacCity = document.getElementById('vacancy-city');
            const conttile = document.getElementById('conttile');
            const contPetrozavodsk = document.getElementById('petrozavodsk-cont');
            const contVoronezh = document.getElementById('voronezh-cont');
            const contChelyabinsk = document.getElementById('chelyabinsk-cont');
            const vacancyTab = document.getElementById('vacancyTab');

            main.classList.add(city);
            if(city === 'all'){
                topMain.innerText = '';
                vacCity.innerText = 'Контактного центра';
                contPetrozavodsk.style.display = 'block';
                contVoronezh.style.display = 'block';
                contChelyabinsk.style.display = 'block';
                adresses.classList.add('col-lg-7', 'col-xl-9');
                shares.classList.add('col-lg-5', 'col-xl-3');
                conttile.innerText ="Адреса контакных центров";
                vacancyTab.style.display = 'block';
                this.mountTabs();
            }

            if(city === 'petrozavodsk'){
                topMain.innerText = 'Петрозаводск';
                vacCity.innerText = 'в Петрозаводске';
                contPetrozavodsk.style.display = 'block';
                vacancyTab.style.display = 'none';
            }
            if(city === 'voronezh'){
                topMain.innerText = 'Воронеж';
                vacCity.innerText = 'в Воронеже';
                contVoronezh.style.display = 'block';
                vacancyTab.style.display = 'none';
            }
            if(city === 'chelyabinsk'){
                topMain.innerText = 'Челябинск';
                vacCity.innerText = 'в Челябинске';
                contChelyabinsk.style.display = 'block';
                vacancyTab.style.display = 'none';
            }
        }
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const city = urlParams.get('city') || 'all';
    window.cc.init(city);

}
