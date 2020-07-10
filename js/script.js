window.addEventListener('DOMContentLoaded', function()
{
    'use strict';

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
