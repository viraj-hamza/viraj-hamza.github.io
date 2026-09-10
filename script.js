const form = document.querySelector('#enquiry-form');
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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());

  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';

  try {
    const response = await fetch('https://formsubmit.co/ajax/vnhtutors@outlook.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Submission failed');

    form.reset();
    status.textContent = 'Thank you. Your enquiry has been sent and we will be in touch.';
  } catch (error) {
    status.textContent = 'We could not send your enquiry. Please email vnhtutors@outlook.com directly.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
  }
});

const testimonialTrack = document.querySelector('#testimonial-track');
const testimonialCards = [...testimonialTrack.querySelectorAll('.testimonial')];
const testimonialPrev = document.querySelector('#testimonial-prev');
const testimonialNext = document.querySelector('#testimonial-next');
const testimonialPosition = document.querySelector('#testimonial-position');
const testimonialsBlock = document.querySelector('.testimonials-block');
let testimonialIndex = 0;
let testimonialAutoplay;

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

const stopTestimonialAutoplay = () => {
  window.clearInterval(testimonialAutoplay);
};

const startTestimonialAutoplay = () => {
  stopTestimonialAutoplay();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  testimonialAutoplay = window.setInterval(() => {
    if (!document.hidden) showTestimonial(testimonialIndex + 1);
  }, 10000);
};

const moveTestimonialManually = (change) => {
  showTestimonial(testimonialIndex + change);
  startTestimonialAutoplay();
};

testimonialPrev.addEventListener('click', () => moveTestimonialManually(-1));
testimonialNext.addEventListener('click', () => moveTestimonialManually(1));

testimonialsBlock.addEventListener('mouseenter', stopTestimonialAutoplay);
testimonialsBlock.addEventListener('mouseleave', startTestimonialAutoplay);
testimonialsBlock.addEventListener('focusin', stopTestimonialAutoplay);
testimonialsBlock.addEventListener('focusout', (event) => {
  if (!testimonialsBlock.contains(event.relatedTarget)) startTestimonialAutoplay();
});
testimonialTrack.addEventListener('pointerdown', stopTestimonialAutoplay);
testimonialTrack.addEventListener('pointerup', startTestimonialAutoplay);

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
startTestimonialAutoplay();
