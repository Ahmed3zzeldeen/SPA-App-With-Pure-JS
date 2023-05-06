export function checkValidityLogin(formData) {
  const nameInputElm = document.querySelector('[name=author_name]');
  const emailInputElm = document.querySelector('[name=author_email]');

  const name = formData.get('author_name');
  const email = formData.get('author_email');
  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z-\0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!name) {
    nameInputElm.classList.add('is-invalid');
  }

  if (!email || !emailPattern.test(email)) {
    emailInputElm.classList.add('is-invalid');
  }
  const invalidElms = document.querySelectorAll('.login-form-container .is-invalid');

  if (invalidElms.length) {
    invalidElms.forEach(elem => {
      elem.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
    return false;
  } else {
    return true;
  }
}