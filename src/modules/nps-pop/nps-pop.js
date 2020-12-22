/**
 * Nps
 */

export default function nps() {
        window.npspop = window.npspop || {
            interval: 0,
            data: {
                formid: '',
                rate: 0,
                reason: '',
                message: ''
            },
            el:{
                all: document.querySelector(".nps"),
                title: document.getElementById('nps_title'),
                stars: document.querySelector(".nps_front__stars"),
                buttons: document.querySelectorAll(".nps_front__stars-button"),
                reason: document.querySelector(".nps_front__reason"),
                radio: document.querySelectorAll(".nps_front__reason-label"),
                details: document.querySelector(".nps_front__details"),
                message: document.getElementById('nps_message'),
                submit: document.getElementById('nps_submit'),
                thanks: document.querySelector(".nps_front__thanks"),
                close: document.querySelector(".nps_front__close"),
            },

            init: function(){
                let self = this;
                localStorage.timer = localStorage.timer || 6;
                this.interval = (localStorage.timer > 0) ? setInterval(this.timeout.bind(this), 5000) : 0;
                this.el.buttons.forEach(
                   function(element){
                       element.addEventListener('click', function(){self.starLogic(element.dataset.rate)});
                       element.addEventListener('mouseover', function(){self.starHover(element.dataset.rate)});
                       element.addEventListener('mouseout', function(){self.starHover(0)});
                   }
                )
                this.el.close.addEventListener('click',function (){self.closeModal()} );
            },

            timeout:function(){
                let timer = localStorage.timer;
                if( timer <= 5 ){
                    localStorage.timer = 0;
                    clearInterval(this.interval);
                    this.interval = 0;
                    this.action();
                }else{
                    localStorage.timer = timer - 5;
                }
            },

            action: function (){
                this.el.all.classList.remove('hide');
            },

            starHover: function (rate){
                this.el.buttons.forEach(function(element){
                    if(element.dataset.rate <= rate){
                        element.classList.add('hover');
                    }else{
                        element.classList.remove('hover');
                    }
                });
            },

            starLogic: function(rate){
                this.data.rate = rate;
                this.el.buttons.forEach(function(element){
                    if(element.dataset.rate <= rate){
                        element.classList.add('active');
                    }else{
                        element.classList.remove('active');
                    }
                });

                if(rate == 5){
                    this.sendData();
                    this.openThnx();
                } else {
                    if(this.el.reason.classList.contains('hide')){
                        this.openReason();
                        this.sendData();
                    }
                }

            },

            openReason: function (){
                let self = this;
                this.el.title.innerText="Что мы могли бы улучшить?";
                this.el.reason.classList.remove('hide');
                this.el.radio.forEach(
                    function(element){
                        if(element.dataset.reason){
                            element.addEventListener('click', function(){
                                self.data.reason = this.innerText;
                                self.openDetails();
                                self.sendData();
                            });
                        }else{
                            element.addEventListener('click', function(){
                                self.data.reason = this.innerText;
                                self.openThnx();
                                self.sendData();
                            });
                        }
                    }
                )

            },

            openDetails: function(){
                this.el.title.innerText="Напишите, пожалуйста, свой вариант ответа";
                this.el.stars.classList.add('hide');
                this.el.reason.classList.add('hide');
                this.el.details.classList.remove('hide');
                this.el.submit.addEventListener('click', function (){
                    this.data.message = this.el.message.value;
                    this.sendData();
                    this.openThnx();
                }.bind(this));

            },

            openThnx: function(){
                this.el.title.innerText="Спасибо за участие!";
                this.el.stars.classList.add('hide');
                this.el.reason.classList.add('hide');
                this.el.details.classList.add('hide');
                this.el.thanks.classList.remove('hide');
                setTimeout(this.closeModal.bind(this), 3000);
            },

            closeModal: function (){
                this.el.all.style.display = 'none';
            },

            sendData:function(){
                let self = this;
                let data = new FormData();
                //self.data.cid = (window.ga.getAll().length !== 0) ? window.ga.getAll()[0].get('clientId') : 'na';
                self.data.url = self.data.url || window.location.href;
                data.append('formid', self.data.formid);
                data.append('rate', self.data.rate);
                data.append('reason', self.data.reason);
                data.append('message', self.data.message);
                data.append('cid', self.data.cid);
                data.append('url', self.data.url);
                fetch('https://tryiqos.ru/check-region/ts.php', {
                    method: 'POST',
                    body: data,
                }).then(
                    response => response.text()
                ).then(
                    data => {
                        console.log(data)
                        if(data && data != 'ok'){
                            self.data.formid = Number(data);
                        }
                    }
                );
            }
        };

        window.npspop.init();
}
