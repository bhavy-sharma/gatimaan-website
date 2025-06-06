  const boxes = document.querySelectorAll('.des');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100); 
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.1
    });

    boxes.forEach(box => observer.observe(box));

    // On page reload

  window.addEventListener('load', () => {
  if (window.location.pathname !== '/') return; // Only on homepage
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
});
