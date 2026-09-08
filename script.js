const form = document.querySelector('#draft-form');
const status = document.querySelector('#form-status');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

const setMenuOpen = (open) => {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  mobileMenu.hidden = !open;
};

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 940) setMenuOpen(false);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Draft only. Enquiries will be enabled when the contact address is agreed.';
});

const testimonialTrack = document.querySelector('#testimonial-track');
const testimonialCards = [...testimonialTrack.querySelectorAll('.testimonial')];
const testimonialPrev = document.querySelector('#testimonial-prev');
const testimonialNext = document.querySelector('#testimonial-next');
const testimonialPosition = document.querySelector('#testimonial-position');
let testimonialIndex = 0;

const updateTestimonialControls = () => {
  testimonialPosition.textContent = `Showing ${testimonialIndex + 1} of ${testimonialCards.length}`;
  testimonialCards.forEach((card, index) => {
    card.classList.toggle('active', index === testimonialIndex);
  });
};

const showTestimonial = (index) => {
  testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
  testimonialTrack.scrollTo({
    left: testimonialCards[testimonialIndex].offsetLeft - testimonialTrack.offsetLeft,
    behavior: 'smooth'
  });
  updateTestimonialControls();
};

testimonialPrev.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
testimonialNext.addEventListener('click', () => showTestimonial(testimonialIndex + 1));

let testimonialScrollTimer;
testimonialTrack.addEventListener('scroll', () => {
  window.clearTimeout(testimonialScrollTimer);
  testimonialScrollTimer = window.setTimeout(() => {
    const trackLeft = testimonialTrack.offsetLeft + testimonialTrack.scrollLeft;
    const closestIndex = testimonialCards.reduce((closest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - trackLeft);
      const closestDistance = Math.abs(testimonialCards[closest].offsetLeft - trackLeft);
      return currentDistance < closestDistance ? index : closest;
    }, 0);
    testimonialIndex = closestIndex;
    updateTestimonialControls();
  }, 100);
});

window.addEventListener('resize', () => showTestimonial(testimonialIndex));
updateTestimonialControls();
