let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
let autoSlide = setInterval(nextSlide, 6000);  // slightly slower for smoothness
const numSlices = 4;

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

  // Prepare slices and animate breakup
  createSlices(current);
  const slices = current.querySelectorAll('.carousel-slice');

  // Show next slide underneath but hidden
  next.classList.add('active');
  next.style.zIndex = 1;
  current.style.zIndex = 2;

  // Animate slices
  slices.forEach((slice, i) => {
    slice.style.animation = `sliceFlyAway 1.2s ease forwards`;
    slice.style.animationDelay = `${i * 0.25}s`;
  });

  // Fade out the whole current slide smoothly after slices start flying
  current.style.transition = 'opacity 1.5s ease';
  current.style.opacity = '0';

  // After animation completes, cleanup
  setTimeout(() => {
    current.classList.remove('active');
    slices.forEach(s => s.remove());
    current.style.zIndex = '';
    current.style.opacity = '';
    current.style.transition = '';
    next.style.zIndex = '';
    currentSlide = index;
  }, 5000);
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function pauseAutoSlide() {
  clearInterval(autoSlide);
}

// Swipe and event handling unchanged (same as previous code)...

// Initialize first slide as active and fully visible
slides[currentSlide].classList.add('active');
slides[currentSlide].style.opacity = '1';
