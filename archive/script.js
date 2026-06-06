 // === REVEAL ANIMATIONS ===
const revealElements = document.querySelectorAll(".reveal, .reveal-up");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// === SMOOTH SCROLL ===
function smoothScroll(targetY, duration = 600) {
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  let start;

  function easeInOutQuad(t) {
    return t < 0.5 
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    const eased = easeInOutQuad(percent);

    window.scrollTo(0, startY + diff * eased);
    if (time < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    const offset = target.offsetTop - 80;
    smoothScroll(offset);
  });
});


//  PRELOADER
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.classList.add('hide');

    setTimeout(() => {
      startNavTyping();
    }, 800); 

  }, 500); 
});
