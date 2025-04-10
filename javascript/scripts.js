function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-user").value.trim();

  if (!username) {
    alert("Введіть ім’я користувача");
    return false;
  }

  localStorage.setItem("motopastva-user", username);
  window.location.href = "dashboard.html";
  return false;
}

function logout() {
  localStorage.removeItem("motopastva-user");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("motopastva-user");
  const displayEl = document.getElementById("username-display");

  if (displayEl) {
    if (!username) {
      window.location.href = "index.html";
    } else {
      displayEl.textContent = username;
    }
  }
});