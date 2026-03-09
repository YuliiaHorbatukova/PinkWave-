// Отримуємо посилання на форму логіну та елемент для повідомлення про помилку
const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Жорстко закодовані валідні дані для демонстрації
// (у продакшн слід використовувати безпечну авторизацію)
const VALID_EMAIL = "yuliia.horbatiukova.editor@pinkwave.ie";
const VALID_PASSWORD = "12345yullia";

// Додаємо обробник події на відправку форми
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Отримуємо значення полів email та password, обрізаючи пробіли
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Перевіряємо, чи збігаються введені дані з валідними
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    localStorage.setItem("isEditorLoggedIn", "true");

    window.location.href = "editor.html";
  } else {
    errorMessage.style.display = "block";
  }
});

// Ховаємо повідомлення про помилку при повторному введенні даних
document.getElementById("email").addEventListener("input", () => {
  errorMessage.style.display = "none";
});
document.getElementById("password").addEventListener("input", () => {
  errorMessage.style.display = "none";
});
