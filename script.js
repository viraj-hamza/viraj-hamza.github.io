const form = document.querySelector('#draft-form');
const status = document.querySelector('#form-status');

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

const visibleTestimonials = () => window.matchMedia('(max-width: 680px)').matches ? 1 : 2;

const updateTestimonialControls = () => {
  const visible = visibleTestimonials();
  const finalIndex = Math.max(0, testimonialCards.length - visible);
  testimonialIndex = Math.min(testimonialIndex, finalIndex);
  testimonialPrev.disabled = testimonialIndex === 0;
  testimonialNext.disabled = testimonialIndex === finalIndex;
  testimonialPosition.textContent = `Showing ${testimonialIndex + 1} to ${Math.min(testimonialIndex + visible, testimonialCards.length)} of ${testimonialCards.length}`;
};

const showTestimonial = (index) => {
  const finalIndex = Math.max(0, testimonialCards.length - visibleTestimonials());
  testimonialIndex = Math.max(0, Math.min(index, finalIndex));
  testimonialTrack.scrollTo({
    left: testimonialCards[testimonialIndex].offsetLeft - testimonialTrack.offsetLeft,
    behavior: 'smooth'
  });
  updateTestimonialControls();
};

testimonialPrev.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
testimonialNext.addEventListener('click', () => showTestimonial(testimonialIndex + 1));

window.addEventListener('resize', () => showTestimonial(testimonialIndex));
updateTestimonialControls();
