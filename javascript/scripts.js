function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("login-user").value.trim();
  if (!username) {
    alert("Введіть ім’я користувача");
    return false;
  }
  localStorage.setItem("motopastva-user", username);
  window.location.href = "dashboard.html";
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

  const feedbackForm = document.getElementById("feedback-form");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedback);
  }

  function handleFeedback(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const output = document.getElementById("feedback-success");

    if (!name || !email || !message) {
      output.textContent = "Будь ласка, заповніть всі поля.";
      return;
    }

    output.textContent = "Дякуємо за ваше повідомлення!";
    form.reset();
  }

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  window.openModal = function (imgElement) {
    if (modal && modalImg) {
      modal.style.display = "flex";
      modalImg.src = imgElement.src;
    }
  };
  window.closeModal = function () {
    if (modal) {
      modal.style.display = "none";
    }
  };

  const carousel = document.querySelector(".members-gallery__carousel");
  if (carousel) {
    const imgs = document.querySelectorAll(".members-gallery__img");

    function highlightCenterImage() {
      const center = Math.round(carousel.scrollLeft / 260);
      imgs.forEach((img, index) => {
        img.classList.toggle("members-gallery__img--active", index === center);
      });
    }

    carousel.addEventListener("scroll", () => {
      setTimeout(highlightCenterImage, 100);
    });

    const leftArrow = document.querySelector(".members-gallery__arrow--left");
    const rightArrow = document.querySelector(".members-gallery__arrow--right");

    if (leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () => {
        carousel.scrollBy({ left: -260, behavior: "smooth" });
      });
      rightArrow.addEventListener("click", () => {
        carousel.scrollBy({ left: 260, behavior: "smooth" });
      });
    }
  }

  const toggleBtn = document.querySelector(".toggle-button");
  const newsSection = document.querySelector(".news-section");
  const extraButtons = document.querySelector(".extra-buttons");

  if (toggleBtn && newsSection && extraButtons) {
    toggleBtn.addEventListener("click", () => {
      newsSection.classList.toggle("shift-left");
      extraButtons.classList.toggle("show");
    });
  }
});
