document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const numSlices = 4;
  let autoSlide = setInterval(nextSlide, 6000);

  function createSlices(slide) {
    const oldSlices = slide.querySelectorAll('.carousel-slice');
    oldSlices.forEach(s => s.remove());

    for (let i = 0; i < numSlices; i++) {
      const slice = document.createElement('div');
      slice.classList.add('carousel-slice');
      slice.style.width = `${100 / numSlices}vw`;
      slice.style.left = `${(100 / numSlices) * i}vw`;
      slice.style.backgroundImage = slide.style.backgroundImage;
      slice.style.backgroundPosition = `${(100 / (numSlices - 1)) * i}% 50%`;
      slice.style.setProperty('--dir-x', i % 2 === 0 ? -1 : 1);
      slice.style.setProperty('--dir-y', Math.random() > 0.5 ? -1 : 1);
      slice.style.setProperty('--rot', (Math.random() * 2 - 1).toFixed(2));
      slide.appendChild(slice);
    }
  }

  function showSlide(index) {
    if (index === currentSlide) return;

    const current = slides[currentSlide];
    const next = slides[index];

    createSlices(current);
    const slices = current.querySelectorAll('.carousel-slice');

    next.classList.add('active');
    next.style.zIndex = 1;
    current.style.zIndex = 2;

    slices.forEach((slice, i) => {
      slice.style.animation = `sliceFlyAway 2.2s ease forwards`;
      slice.style.animationDelay = `${i * 0.25}s`;
    });

    current.style.transition = 'opacity 2.5s ease-out';
    current.style.opacity = '0';

    setTimeout(() => {
      current.classList.remove('active');
      slices.forEach(s => s.remove());
      current.style.zIndex = '';
      current.style.opacity = '';
      current.style.transition = '';
      next.style.zIndex = '';
      currentSlide = index;
    }, 3000);
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Attach event listeners to buttons (auto-slide will keep running)
  document.querySelector('.carousel-btn.next').addEventListener('click', nextSlide);
  document.querySelector('.carousel-btn.prev').addEventListener('click', prevSlide);

  // Initialize first slide visible
  slides[currentSlide].classList.add('active');
  slides[currentSlide].style.opacity = '1';
});
