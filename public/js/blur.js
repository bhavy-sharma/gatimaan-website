    document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const section = card.closest('.courses-section');
    section.classList.add('blur');
    card.classList.add('hovered');
  });

  card.addEventListener('mouseleave', () => {
    const section = card.closest('.courses-section');
    section.classList.remove('blur');
    card.classList.remove('hovered');
  });
});