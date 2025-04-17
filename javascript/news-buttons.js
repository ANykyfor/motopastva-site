function toggleExtraButtons() {
  const newsSection = document.querySelector('.news-section');
  const extraButtons = document.querySelector('.extra-buttons');

  newsSection.classList.toggle('shift-left');
  extraButtons.classList.toggle('show');
}
