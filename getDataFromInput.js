const loginInput = document.querySelector('#loginInput');
const loginInputs = loginInput.querySelectorAll('input');

const passwordInput = document.querySelector('#passwordInput');
const passwordInputs = passwordInput.querySelectorAll('input');
function GetDataFromInput() {
    let id = '';
    let password = '';
    loginInputs.forEach(elem => {
        id += elem.value;
    })
    passwordInputs.forEach(elem => {
        password += elem.value;
    })
    return {id,password};
}

export default GetDataFromInput;