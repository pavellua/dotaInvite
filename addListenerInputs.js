const loginInput = document.querySelector('#loginInput');
const loginInputs = loginInput.querySelectorAll('input');

const passwordInput = document.querySelector('#passwordInput');
const passwordInputs = passwordInput.querySelectorAll('input');



function AddListenerInputs () {
    loginInput.addEventListener('input', (e) => {
        moveCaretka (e, loginInputs);
    
    });
    loginInput.addEventListener('keydown', (e) => {
        cleanInput (e, loginInputs);
    
    });
    passwordInput.addEventListener('input', (e) => {
        moveCaretka (e, passwordInputs);
    
    });
    passwordInput.addEventListener('keydown', (e) => {
        cleanInput (e, passwordInputs);
    
    });




    function moveCaretka (e, inputs) {
        if (e.target.value.length == 1 && e.target.dataset.item != inputs.length) {
            inputs[e.target.dataset.item].focus();
        }
    }
    function cleanInput (e, inputs) {
      if (e.key == 'Backspace') {
            if (e.target.value.length == 0 && e.target.dataset.item != 1) {
                inputs[e.target.dataset.item - 2].focus();
            }
            else if (e.target.value.length == 1 && e.target.dataset.item != 1) {
                // e.preventDefault();
                e.target.value = '';
                // inputs[e.target.dataset.item - 2].focus();
            }
        }
    
    }
}
export default AddListenerInputs;