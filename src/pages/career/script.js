import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import map from 'lodash/map';
import flattenDeep from 'lodash/flattenDeep';

export default function career() {
    const log = console.log.bind(console);
    window.career = window.career || {
        city:{},
        panel: {
            window: document.getElementById("off-panel"),
            title: document.getElementById("off-panel-title"),
            options: document.getElementById("off-panel-options"),
            duties: document.getElementById("off-panel-duties"),
            reqs: document.getElementById("off-panel-reqs"),
            email: document.getElementById("off-panel-email"),
        },
        filter: document.getElementById("filter"),
        selectExp: document.getElementById("filter-exp"),
        selectDirection: document.getElementById("filter-direction"),
        data: {},
        showData:{},

        init: function(){
            this.getCityList()
                .then(res => res.filterData(this.filter));
            this.filter.addEventListener('change',function (){
                this.filterData(this.filter);
            }.bind(this));
        },

        getCityList: function(){
            let self = this;
            const citySelect = document.getElementById("filter-city");
            const buildSelect = function(list){
                self.data = list;
                //log(list);
                citySelect.innerHTML = '';
                const cityArr = [];
                list.entries.forEach(function(entry){
                    let city = entry.city.name;
                    if(!cityArr.includes(city)){
                        cityArr.push(city);
                        if(city === "Москва"){
                            citySelect.innerHTML += `<option selected value="${city}">${city}</option>`;
                        }
                        else{
                            citySelect.innerHTML += `<option value="${city}">${city}</option>`;
                        }

                    }
                });
                return self;
            };
            return fetch('https://api.bearscience.net/api/collections/get/vacancy?token=640af83da3555c34b4f9846eaa21f1', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sort: {city:1},
                    populate: 1,
                })
            })
                .then(res => res.json())
                .then(res => buildSelect(res));
        },

        filterData: function(form){
            const filters = {
                city: entry => entry.city.name === form.city.value,
                exp:  entry => entry.exp === form.exp.value,
                direction: {
                    col : [],
                    predicate: entry => {
                        let inc = false;
                        entry.direction.forEach(function (dir){
                            inc = (inc !== true) ? filters.direction.col.includes(dir) : true;
                        });
                        return inc;
                    }
                },
            };

            if(form.direction.length > 0){
                for(let i = 0; i < form.direction.length; i++){
                    if(form.direction[i].checked){
                        filters.direction.col.push(form.direction[i].value);
                    }
                }
            }

            // фильтрация по городу
            this.showData = filter(this.data.entries, filters.city);

            // установка фильтров по городу
            this.expSelect(this.showData, form.exp.value);
            this.directionSelect(this.showData, filters.direction.col);

            // фильтрация
            if(form.exp.value){
                this.showData = filter(this.showData, filters.exp);
            }
            if(filters.direction.col.length > 0){
                this.showData = filter(this.showData, filters.direction.predicate);
            }

            //log(this.showData);
            this.buildVacancy(this.showData);

        },
        directionSelect: function (data, directions){
            let select = this.selectDirection;
            select.innerHTML = '';
            uniq(flattenDeep(map(data, 'direction'))).forEach(function(direction){
                if(directions.includes(direction)){
                    select.innerHTML += `
                        <label class="career-job-form_direction">
                            <input type="checkbox" checked name="direction" value="${direction}">
                            <span class="checkmark">${direction}</span>
                        </label>`;
                }else{
                    select.innerHTML += `
                        <label class="career-job-form_direction">
                            <input type="checkbox" name="direction" value="${direction}">
                            <span class="checkmark">${direction}</span>
                        </label>`;
                }
            });

        },
        expSelect: function(data, exp){
            let select = this.selectExp;
            select.innerHTML = `<option value="">Не важно</option>`;
            uniq(map(data, 'exp')).sort().forEach(function(val){
                if(val === exp){
                    select.innerHTML += `<option selected value="${val}">${val}</option>`;
                }else{
                    select.innerHTML += `<option value="${val}">${val}</option>`;
                }
            });
        },
        buildVacancy: function(list){

            const vacancyList = document.getElementById('vacancy');
            vacancyList.innerHTML = `<div class="loader">Поиск вакансий</div>`;
            setTimeout(function (){
                vacancyList.innerHTML = '';
                if(list.length === 0){
                    vacancyList.innerHTML = `<div class="noresult">Вакансии не найдены, попробуйте изменить условия поиска</div>`;
                }else{
                    list.forEach(function (entry, index){
                        vacancyList.innerHTML += `<div class="career-job-item" onclick="window.career.showVacancy(${index})">
                        <h3>${entry.title}</h3>
                        <div class="career-job-item_options" >
                            <div class="option">${entry.department.name}</div>
                            <div class="option">${entry.city.name}</div>
                            <div class="option">${entry.exp}</div>
                        </div>
                    </div>`;
                    });
                }
            }, 1000);
        },
        showVacancy: function (id){
            const data = this.showData[id];
            //log(data);
            this.panel.title.innerHTML = data.title;
            this.panel.options.innerHTML = `
            <div class="option">${data.department.name||''}</div>
            <div class="option">${data.city.name}</div>
            <div class="option">${data.exp}</div>
            `
            this.panel.duties.innerHTML = data.duties;
            this.panel.reqs.innerHTML = data.req;
            this.panel.email.innerHTML = '';
            if(data.contact){
                this.panel.email.innerHTML += `По данной вакансии Вы можете направить резюме на e-mail
                <a href="mailto:${data.contact}">${data.contact}</a> с обязательным указанием названия вакансии в теме письма`
            }
            if(data.phone && data.contact){
                this.panel.email.innerHTML += ` или `;
            }
            if(data.phone){
                this.panel.email.innerHTML += `звоните по телефону: ${data.phone}`;
            }
            this.togglePanel();
            dataLayer.push({'event': 'job_showVacancy', 'vacancy': data.slug, 'city': 'data.city.name'});
        },
        togglePanel: function(){
            this.panel.window.classList.toggle('hidden');
        }

    };

    window.career.init();
}
