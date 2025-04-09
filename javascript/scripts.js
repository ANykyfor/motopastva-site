function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Будь ласка, заповніть всі поля");
    return false;
  }

  const userData = {
    username,
    email,
    password,
  };

  localStorage.setItem("motopastva-user", JSON.stringify(userData));

  alert("Реєстрація успішна!");
  document.getElementById("auth-form").innerHTML = "";
  document.getElementById("auth-buttons").style.display = "flex";

  return false;
}

function handleLogin(event) {
  event.preventDefault();

  const loginUser = document.getElementById("login-user").value.trim();
  const loginPass = document.getElementById("login-pass").value;

  const saved = JSON.parse(localStorage.getItem("motopastva-user"));

  if (
    saved &&
    (saved.username === loginUser || saved.email === loginUser) &&
    saved.password === loginPass
  ) {
    window.location.href = "html/dashboard.html";
  } else {
    alert("Невірні дані. Спробуйте ще раз.");
  }

  return false;
}
