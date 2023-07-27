let buttonPlus = document.getElementById('button-plus');
let buttonMinus = document.getElementById('button-minus');
let parPlus = document.getElementById('par-plus');
let parMinus = document.getElementById('par-minus');

function sendReq(button) {
    fetch('/click', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ button: button })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {

        parPlus.innerText = data.counterPlus;
        parMinus.innerText = data.counterMinus;
    })
        .catch(function (err) {
        console.log(err);
    });
}
buttonPlus.addEventListener('click', function () {
    sendReq("plus" /* Button.plus */);
});
buttonMinus.addEventListener('click', function () {
    sendReq("minus" /* Button.minus */);
});
