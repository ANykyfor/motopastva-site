function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Будь ласка, заповніть усі поля.");
    return false;
  }

  const user = { username, email, password };
  localStorage.setItem("motopastva-user", JSON.stringify(user));

  alert("Реєстрація успішна!");
  window.location.href = "html/profile.html";

  return false;
}

function handleLogin(event) {
  event.preventDefault();

  const emailOrName = document.getElementById("login-user").value.trim();
  const password = document.getElementById("login-pass").value;

  const savedUser = JSON.parse(localStorage.getItem("motopastva-user"));

  if (
    savedUser &&
    (savedUser.username === emailOrName || savedUser.email === emailOrName) &&
    savedUser.password === password
  ) {
    window.location.href = "html/profile.html";
  } else {
    alert("Невірні дані для входу.");
  }

  return false;
}

window.addEventListener("DOMContentLoaded", () => {
  const nameField = document.getElementById("profile-name");
  const emailField = document.getElementById("profile-email");

  if (nameField && emailField) {
    const user = JSON.parse(localStorage.getItem("motopastva-user"));
    if (!user) {
      window.location.href = "../index.html";
      return;
    }

    nameField.textContent = user.username;
    emailField.textContent = user.email;
  }
});

function handleLogout() {
  localStorage.removeItem("motopastva-user");
  window.location.href = "../index.html";
}
