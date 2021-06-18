console.log('validateLogin.js laded');

function validateLogin(callBackFunction) {
    var authKey = localStorage.getItem('authKey');

    if (authKey) {
        const url = new URL(
            "http://quiz.siit.ro/api/profile"
        );
        
        let headers = {
            "Authorization": "Bearer " + authKey,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        fetch(url, {
            method: "GET",
            headers,
        }).then(response => response.json())
        .then(data => callBackFunction(data));
    }
    else {
        location.replace("../index.html");
    }
}