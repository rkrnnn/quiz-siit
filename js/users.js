console.log('main.js loaded');

var pageDisplay = document.querySelector(".content");
var welcomeMsg = document.querySelector(".welcome-msg");
var profileDisplay = document.querySelector(".profile-section");
var userNameDisplay = document.querySelectorAll(".username");
var emailAddressDisplay = document.querySelectorAll(".email-address");
var dateAccountCreatedDisplay = document.querySelectorAll(".date-created");
var dateAccountModifiedDisplay = document.querySelectorAll(".date-modified");

var variablesDisplay = document.querySelectorAll(".variables");
var loadingsGraphics = document.querySelector("#loader");
var loadingsGraphicsMain = document.querySelector("#loader-main");

validateLogin(getData);
prepareDisplay();



function prepareDisplay() {
    var i = 0;
    while (i < loadingsGraphics.length) {
        loadingsGraphics[i].style.display = "";
        i++;
    }

    // pageDisplay.style.display = "none";
}


function displayVarInPlace(variable, nodeList) {
    var i = 0;
    while (i < nodeList.length) {
        nodeList[i].innerText = variable;
        nodeList[i].style.display = "";
        i++;
    }
}

function displayUserQuestions(id) {
    getQuestions(id);
}



function getData(json) {
    // console.log(json);
    displayVarInPlace(json.name, userNameDisplay);
    displayVarInPlace(json.email, emailAddressDisplay);

    displayUserQuestions(json.id);
    
    pageDisplay.style.display = "";
    
    var date = new Date(json.created_at);
    displayVarInPlace(date.toLocaleString('ro-RO'), dateAccountCreatedDisplay);
    var date = new Date(json.updated_at);
    displayVarInPlace(date.toLocaleString('ro-RO'), dateAccountModifiedDisplay);
    
    welcomeMsg.style.display = "";
    profileDisplay.style.display = "";
    
    var i = 0;
    while (i < loadingsGraphics.length) {
        loadingsGraphics[i].style.display = "none";
        i++;
    }
}


function logoutUser() {
    console.log('Logging out.');
    localStorage.removeItem('authKey');

    validateLogin(getData);
}




