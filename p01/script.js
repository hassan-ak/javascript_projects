const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');

// Function to show error
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

// function to check valid email
function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    if (username.value === '') {
        showError(username,'Username is required')
    }
    else{
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email,'Email is required')
    }
    else if (!isEmailValid(email.value)){
        showError(email,'Email is invalid')
    }

    else{
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password,'Password is required')
    }
    else{
        showSuccess(password);
    }

    if (confirm_password.value === '') {
        showError(confirm_password,'Confirm your password')
    }
    else{
        showSuccess(confirm_password);
    }




})
