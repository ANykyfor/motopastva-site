function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Будь ласка, заповніть всі поля");
    return false;
  }

  localStorage.setItem(
    "motopastva-user",
    JSON.stringify({ username, email, password })
  );

  window.location.href = "main.html";
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
    window.location.href = "main.html";
  } else {
    alert("Невірні дані");
  }

  return false;
}
