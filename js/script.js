window.addEventListener('DOMContentLoaded', function()
{
    'use strict';



    //TABS
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


      function hideTabContent(a) {
          for (let i = a; i < tabContent.length; i++) {
                 tabContent[i].classList.remove('show');
                 tabContent[i].classList.add('hide');
          }
        }
        hideTabContent(1);

        function showTabContent(b){
             if(tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
             }
        }
           

        info.addEventListener('click', function(event) {
               let target = event.target;
               if (target && target.classList.contains('info-header-tab')) {
                    for(let i=0; i < tab.length; i++){
                        if(target == tab[i]) 
                        {
                            hideTabContent(0);
                            showTabContent(i);
                            break;
                        }
                        
                    }
               }
        });




      //  TIMER

        let deadline = '2020-08-21';
        function getTimeRemaining(endtime)
        {
            let t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor((t/(1000 * 60 * 60)));

                return{
                         'total' : t,
                         'hours' : hours,
                         'minutes' : minutes,
                         'seconds' : seconds
                };
        }

        function setClock(id, endtime)
        {
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeinterval = setInterval(updateClock, 1000);

                function updateClock()
                {
                    let t = getTimeRemaining(endtime);
                    hours.textContent = t.hours;
                    minutes.textContent = t.minutes;
                    seconds.textContent = t.seconds;

                    if (T.total <= 0 ) {
                        clearInterval(timeinterval);
                    }
                }
        }
        setClock('timer', deadline);



    // MODAL Window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


more.addEventListener('click', function(){
     overlay.style.display = 'block';
     this.classList.add('more-splash');
     document.body.style.overflow = 'hidden';
          
});

close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
});


    //FORM

    let message = {
        loading: 'Loading...',
        success: 'Thanks !',
        failure: 'Somethink get wrong ...'
    };

    let form =  document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessages = document.createElement('div');


        statusMessages.classList.add('status');

        form.addEventListener('submit', function(event) {
              event.preventDefault();

              form.appendChild(statusMessages);

              let request = new XMLHttpRequest();
              request.open('POST', 'server.php');
            //   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            
              let formData = new FormData(form);

              let obj = {};

              formData.forEach(function (value, key) {
                  obj[key] = value;
              });
              let json = JSON.stringify(obj);


              request.send(json);

                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        statusMessages.innerHTML = message.loading;
                    }  
                    else if(request.readyState === 4 && request.status == 200){
                        statusMessages.innerHTML = message.success;
                    }else {
                        statusMessages.innerHTML = message.failure;
                    }
                });

                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
        }); 




});