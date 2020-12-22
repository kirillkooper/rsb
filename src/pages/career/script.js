
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

        init: function(){
            this.getCityList()
                .then(res => res.getVacancy(this.filter));
            this.filter.addEventListener('change',function (){
                this.getVacancy(this.filter);
            }.bind(this));


        },

        getCityList: function(){
            let self = this;
            const citySelect = document.getElementById("filter-city");
            const buildSelect = function(cityList){
                //log(cityList);
                citySelect.innerHTML = '';
                cityList.entries.forEach(function(entry){
                    citySelect.innerHTML += `<option value="${entry.name}">${entry.name}</option>`;
                });
                return self;
            };
            return fetch('https://api.bearscience.net/api/collections/get/city?token=640af83da3555c34b4f9846eaa21f1')
                .then(res => res.json())
                .then(res => buildSelect(res));
        },

        getVacancy: function (form){
            let self = this;
            const filters = {
            };

            if(form.direction.length > 0){
                for(let i = 0; i < form.direction.length; i++){
                    if(form.direction[i].checked){
                        filters['$or'] = filters['$or'] || [];
                        filters['$or'].push({'direction': form.direction[i].value});
                    }
                }
            }
            filters['city.display'] = form.city.value;
            if(form.exp.value !== ''){
                filters['exp'] = form.exp.value;
            }

            fetch('https://api.bearscience.net/api/collections/get/vacancy?token=640af83da3555c34b4f9846eaa21f1', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filter: filters,
                    sort: {_created:-1},
                    populate: 1,
                })
            })
                .then(res=>res.json())
                .then(res => self.buildVacancy(res));
        },

        buildVacancy: function(list){
            this.data = list;
            const vacancyList = document.getElementById('vacancy');
            vacancyList.innerHTML = `<div class="loader">Поиск вакансий</div>`;
            setTimeout(function (){
                vacancyList.innerHTML = '';
                if(list.total === 0){
                    vacancyList.innerHTML = `<div class="noresult">Вакансии не найдены, попробуйте изменить условия поиска</div>`;
                }else{
                    list.entries.forEach(function (entry, index){
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
            const data = this.data.entries[id];
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

        },
        togglePanel: function(){
            this.panel.window.classList.toggle('hidden');
        }

    };

    window.career.init();
}
