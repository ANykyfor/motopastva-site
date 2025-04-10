const users = [
  { username: "admin", password: "123456" },
  { username: "artem", password: "motopastva" },
];

function handleLogin(event) {
  event.preventDefault();

  const login = document.getElementById("login-user").value.trim();
  const password = document.getElementById("login-pass").value;

  const user = users.find(
    (u) => u.username === login && u.password === password
  );

  if (user) {
    localStorage.setItem("motopastva-user", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Невірні дані. Спробуй ще раз.");
  }
}