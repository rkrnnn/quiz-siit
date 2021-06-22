console.log('getQuestions.js loaded');

var userQuestionsDisplay = document.querySelector(".user-question-ol");
var userQuestionsAlertNone = document.querySelector(".alert-info");

var authKey = localStorage.getItem('authKey');

const url = new URL(
    "http://quiz.siit.ro/api/questions/own"
);

let headers = {
    "Authorization": "Bearer " + authKey,
    "Content-Type": "application/json",
    "Accept": "application/json",
};


function getQuestions() {
    fetch(url, {
        method: "GET",
        headers,
    }).then(response => response.json()
    .then (data => parseQuestions(data)));
}

function parseQuestions(json) {
    var i = 0;
    while (i < json.length) {
        var userQuestionLI = document.createElement("LI");
        userQuestionLI.id = 'question-' + json[i].id;
        userQuestionLI.classList.add('user-question');

        var userQuestionHeader = document.createElement("DIV");
        userQuestionHeader.classList.add('user-question-header');
        
        var questionTxtDiv = createQuestionText(json[i]);
        userQuestionHeader.appendChild(questionTxtDiv);  
        var questionControls = createControls();

        var dateCreated = createDateDiv(json[i]);

        var userAnswersGroup = createAnswersGroup(json[i]);

        userQuestionHeader.appendChild(questionControls); 
        
        userQuestionLI.appendChild(userQuestionHeader);
        userQuestionLI.appendChild(dateCreated);
        userQuestionLI.appendChild(userAnswersGroup);
        
        userQuestionsDisplay.appendChild(userQuestionLI);
        
        i++;
    }
    
    if (json.length == 0) {
        userQuestionsAlertNone.style.display = "";
    }
    else {
        userQuestionsAlertNone.style.display = "none";
    }

}

function createQuestionText(obj) {
    var question = document.createElement("DIV");
    var questionText = document.createTextNode(obj.question);
    question.appendChild(questionText);
    question.classList.add('quiz-question');
    question.id = 'q' + obj.id;

    return question;
}


function createControls() {
    var questionControls = document.createElement("DIV");
    questionControls.classList.add('controls');

    var editBtn = document.createElement("BUTTON");
    editBtn.innerHTML = '<i class="bi bi-gear"></i>';
    editBtn.classList.add('btn');
    editBtn.classList.add('pseudo-btn');

    questionControls.appendChild(editBtn);

    var deleteBtn = document.createElement("BUTTON");
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('pseudo-btn');
    deleteBtn.classList.add('btn-delete');

    questionControls.appendChild(deleteBtn);

    return questionControls;
}

function createDateDiv(questionObj) {
    var dateCreated = document.createElement("DIV");
    dateCreated.classList.add('q-date-added');
    var date = new Date(questionObj.created_at);
    // var time = new
    dateCreated.innerHTML = '<i class="bi bi-calendar-plus"></i>  ' + date.toLocaleDateString('ro-RO') +  ', <i class="bi bi-clock"></i>  ' + date.toLocaleTimeString('ro-RO');

    return dateCreated;
}

function createAnswersGroup(questionObj) {
    var userAnswersGroup = document.createElement("DIV");
    var answersUL = document.createElement("UL");
    userAnswersGroup.appendChild(answersUL);

    var i = 0;
    while (i < questionObj.answers.length) {
        var answer = document.createElement("LI");
        answer.innerText = questionObj.answers[i].text;

        if (questionObj.answers[i].right == 1) {
            answer.classList.add('correct-answ');
        }

        answersUL.appendChild(answer);

        i++;
    }

    userAnswersGroup.classList.add('user-answers-group');
    return userAnswersGroup;
}


