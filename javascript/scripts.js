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
  window.location.href = "html/dashboard.html";
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
    window.location.href = "html/dashboard.html";
  } else {
    alert("Невірні дані для входу.");
  }

  return false;
}

function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem("motopastva-user"));
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  const nameEl = document.getElementById("profile-name");
  const emailEl = document.getElementById("profile-email");

  if (nameEl) nameEl.textContent = user.username;
  if (emailEl) emailEl.textContent = user.email;
}

function logout() {
  localStorage.removeItem("motopastva-user");
  window.location.href = "../index.html";
}

if (
  window.location.pathname.includes("dashboard.html") ||
  window.location.pathname.includes("profile.html")
) {
  window.addEventListener("DOMContentLoaded", loadUserProfile);
}
