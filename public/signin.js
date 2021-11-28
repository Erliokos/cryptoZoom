const $form = document.forms.form;

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputData = Object.fromEntries(new FormData($form));

  const response = await fetch("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputData),
  });
  if (response.status === 400) {
    alert("не правильный логин или пароль");
  }
  if (response.status === 200) {
    alert("авторизация прошла успешно");
    window.location.pathname = "/";
  }
});
