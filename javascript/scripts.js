function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-user").value.trim();


  const imgs = document.querySelectorAll('.members-gallery__img');
carousel.addEventListener('scroll', () => {
  imgs.forEach((img) => img.classList.remove('members-gallery__img--active'));
  const center = Math.floor(imgs.length / 2);
  imgs[center].classList.add('members-gallery__img--active');
});

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
function openModal(imgElement) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = imgElement.src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
function highlightCenterImage() {
  const images = carousel.querySelectorAll('.members-gallery__img');
  const center = Math.round(carousel.scrollLeft / 260); // приблизно
  images.forEach((img, index) => {
    img.classList.toggle('members-gallery__img--active', index === center);
  });
}

carousel.addEventListener('scroll', () => {
  setTimeout(highlightCenterImage, 100); 
});
<script>
  const carousel = document.querySelector('.members-gallery__carousel');
  const leftArrow = document.querySelector('.members-gallery__arrow--left');
  const rightArrow = document.querySelector('.members-gallery__arrow--right');

  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      carousel.scrollBy({ left: -260, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      carousel.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }
</script>
