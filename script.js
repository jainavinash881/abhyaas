// ===== Carousel (unchanged) =====
let slideIndex = 0;
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const totalSlides = images.length;

document.querySelector(".next").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % totalSlides;
  slides.style.transform = `translateX(${-slideIndex * 100}%)`;
});

document.querySelector(".prev").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  slides.style.transform = `translateX(${-slideIndex * 100}%)`;
});

setInterval(() => {
  slideIndex = (slideIndex + 1) % totalSlides;
  slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}, 5000);

// ===== Mobile menu toggle =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", hamburger.classList.contains("active"));
});

const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
});

// Optional: close menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});


// Testimonial Carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
const cardWidth = testimonialCards[0].getBoundingClientRect().width + 20; // card width + margin

// Move to position helper
function moveCarousel() {
  testimonialTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

// Disable/Enable buttons if at the ends
function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= testimonialCards.length - visibleCount;
  prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '1';
  nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '1';
}

// Calculate how many cards fit in view
function getVisibleCount() {
  const wrapperWidth = document.querySelector('.testimonial-track-wrapper').offsetWidth;
  return Math.floor(wrapperWidth / cardWidth) || 1;
}

let visibleCount = getVisibleCount();
window.addEventListener('resize', () => {
  visibleCount = getVisibleCount();
  if(currentIndex > testimonialCards.length - visibleCount) {
    currentIndex = testimonialCards.length - visibleCount;
    if(currentIndex < 0) currentIndex = 0;
    moveCarousel();
  }
  updateButtons();
});

prevBtn.addEventListener('click', () => {
  if(currentIndex > 0) {
    currentIndex--;
    moveCarousel();
    updateButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if(currentIndex < testimonialCards.length - visibleCount) {
    currentIndex++;
    moveCarousel();
    updateButtons();
  }
});

// Initialize buttons state
updateButtons();
