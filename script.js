const form = document.querySelector('#draft-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Draft only — enquiries will be enabled when the contact address is agreed.';
});
