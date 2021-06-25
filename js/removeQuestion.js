console.log('removeQuestion.js loaded');

var  alertCantDelete = document.querySelector(".alert-cannot-delete");


function removeQuestion(event) {
    var id = getIDOfQuestion(event);
    
    const url = new URL(
        "http://quiz.siit.ro/api/questions/" + id
    );
    
    let headers = {
        "Authorization": "Bearer " + authKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    fetch(url, {
        method: "DELETE",
        headers,
    }).then(response => response.json()
    .then(data => removeQuestionRespone(data)));
}


function removeQuestionRespone(json) {
    console.log(json);
    alertCantDelete.innerHTML = '<i class="bi bi-emoji-dizzy" style="font-size: 26px; margin-right: 10px;"></i>Something went wrong. ' + json.message;
    alertCantDelete.style.display = '';
}


function getIDOfQuestion(event) {
    var btnPressed = event.target;
    if (event.target.nodeName == "I") {
        btnPressed = event.target.parentElement;
    }

    var id = btnPressed.parentElement.parentElement.parentElement.id;
    id = parseInt(id.replace("question-", ""));
    
    return id;
}