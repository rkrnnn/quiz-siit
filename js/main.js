console.log('main.js loaded');

var myStorage = window.localStorage;
var emailInput = document.querySelector('input[type="email"]');
var passwordInput = document.querySelector('input[type="password"]');
var loaderGraphics = document.querySelector('#loader');
var loginBtn = document.querySelector('#login-btn');
var alertLoginUnseccessful = document.querySelector(".log-in-unsuccessful");


const url = new URL(
    "http://quiz.siit.ro/api/login"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "",
    "password": "",
    "device_name": ""
}


function loginUser() {
    body.email = emailInput.value;
    body.password = passwordInput.value;
    console.log(body);

    loaderGraphics.style.display = '';
    loginBtn.disabled = true;

    fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then(response => response.json())
    .then(data => getAuth(data));
}


function getAuth(data) {
    loaderGraphics.style.display = 'none';
    loginBtn.disabled = false;

    if (data.errors) {
        alertLoginUnseccessful.style.display = '';
        showInvalidInput(passwordInput);

        if (data.errors.email) {
            showInvalidInput(emailInput);
        }
        if (data.errors.password) {
            showInvalidInput(passwordInput);
        }
    }
    else {
        console.log(data.mesage);
        localStorage.setItem('authKey', data.token);

        emailInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');
        alertLoginUnseccessful.style.display = 'none';

        location.replace("html/users.html");
    }
}


function showInvalidInput(inputField) {
    inputField.classList.add('is-invalid');
}