const API_BASE = "https://5af2-93-170-117-52.ngrok-free.app";

async function handleRegister(event) {
  console.log("handleRegister викликано");
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Будь ласка, заповніть усі поля.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ username, email, password })
    });

    if (res.status === 201) {
      alert("Реєстрація успішна!");
      window.location.href = "html/dashboard.html";
    } else if (res.status === 409) {
      alert("Користувач з таким email вже існує.");
    } else {
      alert("Сталася помилка при реєстрації.");
    }
  } catch (err) {
    console.error(err);
    alert("Помилка з'єднання з сервером.");
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const emailOrUsername = document.getElementById("login-user").value.trim();
  const password = document.getElementById("login-pass").value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ emailOrUsername, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("motopastva-user", JSON.stringify(data));
      window.location.href = "html/dashboard.html";
    } else {
      alert("Невірні дані для входу.");
    }
  } catch (err) {
    console.error(err);
    alert("Помилка з'єднання з сервером.");
  }
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

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;

if (
  window.location.pathname.includes("dashboard.html") ||
  window.location.pathname.includes("profile.html")
) {
  window.addEventListener("DOMContentLoaded", loadUserProfile);
}

document.body.addEventListener("htmx:afterSwap", (event) => {
  if (event.target.id === "auth-form") {
    setTimeout(() => {
      const form = document.querySelector("#auth-form form");
      console.log("форма вставлена", form);
      if (form) {
        form.addEventListener("submit", handleRegister);
      }
    }, 200);
  }
});
