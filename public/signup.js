const $form = document.forms.form

$form.addEventListener('submit', async (e) => {
e.preventDefault();

const inputData = Object.fromEntries(new FormData($form))

const response = await fetch('/signup', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(inputData)
})
if(response.status === 500){
  alert('Данный пользователь уже зареган')
}
if(response.status === 400){
  alert('введите корректные данные')
}
if(response.status === 200){
  alert('регистрация прошла успешно')
  window.location.pathname = '/'
}

})
