console.log('new-user.js loaded');

var newUserEmailInput = document.querySelector('input[type="email"]');
var newUserNameInput = document.querySelector('input[type="name"]');
var newUserPasswordInput = document.querySelector('input[type="password"]');
var newUserPasswordConfirmInput = document.querySelector('#floatingPasswordConfirm');
var alertRegisterUnseccessful = document.querySelector(".register-unsuccessful");

var loaderGraphics = document.querySelector('#loader');
var registerBtn = document.querySelector('#register-btn');



const url = new URL(
    "http://quiz.siit.ro/api/register"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "voluptatem",
    "name": "libero",
    "password": "perferendis",
    "password_confirm": "harum",
    "device_name": ""
}


function registerNewUser() {
    console.log('User registered.');

    var newUserEmail = newUserEmailInput.value;
    var newUserName = newUserNameInput.value;
    var newUserPassword = newUserPasswordInput.value;
    var newUserPasswordConfirm = newUserPasswordConfirmInput.value;
    
    body.email = newUserEmail;
    body.name = newUserName;
    body.password = newUserPassword;
    body.password_confirm = newUserPasswordConfirm;

    fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then(response => response.json()
    .then(data => processData(data)));

}

function processData(json) {
    console.log(json);
    loaderGraphics.style.display = 'none';
    registerBtn.disabled = false;

    if (json.errors) {
        alertRegisterUnseccessful.style.display = '';
        // alertRegisterUnseccessful.innerText = json.message;

        if (json.errors.email) {
            showInvalidInput(newUserEmailInput);
            updateErrorMsg(json.errors.email[0], newUserEmailInput);
        }
        if (json.errors.name) {
            showInvalidInput(newUserNameInput);
            updateErrorMsg(json.errors.name[0], newUserNameInput);
        }
        if (json.errors.password) {
            showInvalidInput(newUserPasswordInput);
            updateErrorMsg(json.errors.password[0], newUserPasswordInput);
        }
        if (json.errors.password_confirm) {
            showInvalidInput(newUserPasswordConfirmInput);
            updateErrorMsg(json.errors.password_confirm[0], newUserPasswordConfirmInput);
        }
    }
    else {
        console.log(json.mesage);
        localStorage.setItem('authKey', json.token);

        newUserEmailInput.classList.remove('is-invalid');
        newUserNameInput.classList.remove('is-invalid');
        newUserPasswordInput.classList.remove('is-invalid');
        newUserPasswordConfirmInput.classList.remove('is-invalid');
        alertRegisterUnseccessful.style.display = 'none';

        location.replace("../html/users.html");
    }
}

function showInvalidInput(inputField) {
    inputField.classList.add('is-invalid');
}

function updateErrorMsg(msg, element) {
    var siblings = element.parentElement.childNodes;
    siblings[5].innerText = msg;
}
