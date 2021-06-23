console.log('addQuestions.js');

var newQuestionTextInput = document.querySelector(".add-q");
var answersInput = document.querySelectorAll(".modal-answers .input-grp");
var addQuestionBtn = document.querySelector(".modal-footer .btn-generic");
var anwersIncompleteAlert = document.querySelector(".answers-incomplete");

function addQuestion() {
    var answers = [];
    var atLeastOneCorrectAnsw = false;

    var i = 0;
    while (i < 4) {
        answers[i] = {
            text: answersInput[i].firstChild.nextSibling.value,
            right: Number(answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.checked)
        };

        if (answers[i].right) {
            atLeastOneCorrectAnsw = true;
        }

        i++;
    }

    console.log(answers);

    if (!atLeastOneCorrectAnsw) {
        var i = 0;
        while (i < 4) {
            answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.classList.add('is-invalid')
            i++;
        };

        anwersIncompleteAlert.style.display = '';
    }
    else {
        var i = 0;
        while (i < 4) {
            answersInput[i].firstChild.nextSibling.nextSibling.nextSibling.classList.remove('is-invalid')
            i++;
        };

        anwersIncompleteAlert.style.display = 'none';
    }

}