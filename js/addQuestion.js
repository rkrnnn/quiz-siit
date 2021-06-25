console.log('addQuestions.js');

var newQuestionTextInput = document.querySelector(".add-q");
var answersInput = document.querySelectorAll(".modal-answers .input-grp");

var addQuestionBtn = document.querySelector(".modal-footer .btn-generic");
var questionsAddedCounter = document.querySelector(".modal-footer .variables");

var anwersIncompleteAlert = document.querySelector(".answers-incomplete");
var anwersIncompleteTextAlert = document.querySelector(".answers-incomplete-text");

var alertNewQuestions = document.querySelector(".alert-new-q");
var alertSomethingWentWrong = document.querySelector(".smth-went-wrong");
var alertQuestionAddedSuccess = document.querySelector(".question-added-success");


addEventListenersToRadios();



function addQuestion() {
    var answers = [];
    
    if (checkForText(newQuestionTextInput) && checkForTextAnswers(answersInput)) {
        if (checkForAnswers()) {
            var i = 0;
            while (i < 4) {
                answers[i] = {
                    text: answersInput[i].firstChild.nextSibling.value,
                    right: Number(answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.checked)
                };
                i++;
            }
            
            if (sendQuestionBuilt(newQuestionTextInput.value, answers)) {
                
            }
        }
    }
}


function refreshQuestionList() {
    userQuestionsDisplay.innerHTML = '';
    userQuestionsAlertNone.style.display = '';
    alertNewQuestions.style.display = 'none';
    alertCantDelete.style.display = 'none';

    getQuestions();
}


function sendQuestionBuilt(q, answ) {
    const url = new URL(
        "http://quiz.siit.ro/api/questions"
    );
    
    let headers = {
        "Authorization": "Bearer " + authKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    let body = {
        "question": q,
        "answers": answ
    }
    
    fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then(response => response.json()
    .then(data => parseResponse(data) ));
}


function parseResponse(json) {
    console.log(json);

    if (json.errors) {
        alertSomethingWentWrong.style.display = '';
        if (json.errors.question) {
            alertSomethingWentWrong.innerText = json.errors.question[0];
        }
    }
    else {
        alertQuestionAddedSuccess.style.display = json.message;
        alertQuestionAddedSuccess.style.display = '';
        alertSomethingWentWrong.style.display = 'none';

        resetModal();
    }
}


function addEventListenersToRadios() {
    var i = 0;
    while (i < 4) {
        var radio = answersInput[i].firstChild.nextSibling.nextSibling.nextSibling;

        radio.addEventListener("click", function(event){
            modifyBackgroundColor(event.target, '#5db036');
            checkForAnswers();
        });
        i++;
    };
}


function modifyBackgroundColor(element, color) {
    var i = 0;
    while (i < 4) {
        answersInput[i].style.backgroundColor = 'white';
        i++;
    };

    if (element.checked) {
        element.parentElement.style.backgroundColor = color + '61';
    }
}

function checkForAnswers() {
    var result = false;
    var i = 0;
    while (i < 4) {
        if (answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.checked) {
            result = true;
        }
        i++;
    };

    if (!result) {
        var i = 0;
        while (i < 4) {
            answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.classList.add('is-invalid');
            i++;
        }
        anwersIncompleteAlert.style.display = '';
    }
    else {
        var i = 0;
        while (i < 4) {
            answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.classList.remove('is-invalid');
            i++;
        }
        anwersIncompleteAlert.style.display = 'none';
    }

    return result;

}

function resetModal() {
    var i = 0;
    while (i < 4) {
        answersInput[i].firstChild.nextSibling.value = '';
        answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.checked = false;
        modifyBackgroundColor(answersInput[i], '#5db036');
        i++;
    };
    
    addEventListenersToRadios();
    increaseQuestionsAddedCounter();
    alertNewQuestions.style.display = '';
    newQuestionTextInput.value = '';
}


function closeSession() {
    var i = 0;
    while (i < 4) {
        answersInput[i].firstChild.nextSibling.value = '';
        answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.checked = false;
        modifyBackgroundColor(answersInput[i], '#5db036');
        i++;
    };
    
    addEventListenersToRadios();
    resetQuestionsAddedCounter();
    newQuestionTextInput.value = '';
}


function resetQuestionsAddedCounter() {
    questionsAddedCounter.innerText = '0';
}

function increaseQuestionsAddedCounter() {
    questionsAddedCounter.innerText = parseInt(questionsAddedCounter.innerText) + 1;
}


function checkForText(element) {
    var result = false;

    if (element.value) {
        result = true;
        element.classList.remove('is-invalid');
    }
    else {
        element.classList.add('is-invalid');
    }

    return result;
}


function checkForTextAnswers(element) {
    var result = true;
    var i = 0;
    while (i < 4) {
        if (!checkForText(element[i].firstChild.nextSibling)) {
            result = false;
            anwersIncompleteTextAlert.style.display = '';
        }
        i++;
    }

    if (result) {
        anwersIncompleteTextAlert.style.display = 'none';
    }

    return result;
}