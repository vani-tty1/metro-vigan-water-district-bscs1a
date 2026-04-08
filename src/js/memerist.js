const track = document.getElementById('track');
const dots  = document.querySelectorAll('.carousel-dot');
let current = 0;

function goTo(idx) {
  current = (idx + 3) % 3;
  track.style.transform = `translateX(calc(-${current * 100}% - ${current * 20}px))`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('next').addEventListener('click', () => goTo(current + 1));
document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));

let timer = setInterval(() => goTo(current + 1), 4500);
track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
track.parentElement.addEventListener('mouseleave', () => {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 4500);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-card, .install-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .4s ${i * 60}ms, transform .4s ${i * 60}ms`;
  observer.observe(el);
});
