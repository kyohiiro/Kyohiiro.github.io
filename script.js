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


  //  TITLE ANIMATION
const text = "Kyohiiro";
const title = document.getElementById("title");
let index = 0;

title.textContent = ""; 

function typeEffect() {
  if (index < text.length) {
    title.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 180);
  } else {
    title.classList.add("idle");
    setTimeout(resetEffect, 2500);
  }
}

function resetEffect() {
  title.classList.remove("idle");
  title.textContent = "";
  index = 0;
  setTimeout(typeEffect, 600);
}

typeEffect();

//  ANIMATION NAVLINK
function startNavTyping() {
  const nav = document.querySelector(".nav__container");
  const navLinks = nav.querySelectorAll("a");

  // === ATUR KECEPATAN DI SINI ===
  const typingSpeed = 25; // ms per huruf
  const linkDelay = 150;  // jeda antar link

  let linkIndex = 0;
  let charIndex = 0;

  const originalTexts = Array.from(navLinks).map(link => link.textContent.trim());

  // kosongin dulu
  navLinks.forEach(link => link.textContent = "");

  // tampilkan nav baru setelah dikosongkan
  nav.classList.remove("hidden");

  function typeNav() {
    if (linkIndex < navLinks.length) {
      const currentText = originalTexts[linkIndex];

      if (charIndex < currentText.length) {
        navLinks[linkIndex].textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeNav, typingSpeed);
      } else {
        charIndex = 0;
        linkIndex++;
        setTimeout(typeNav, linkDelay);
      }
    }
  }

  typeNav();
}

//  CARD
document.querySelectorAll(".retro__window").forEach((win) => {
  const header = win.querySelector(".retro__header");
  const closeBtn = win.querySelector(".close__btn");
  const footerCloseBtns = win.querySelectorAll(".footer__close");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("pointerdown", (e) => {
    isDragging = true;

    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    win.style.zIndex = Date.now();
    header.setPointerCapture(e.pointerId);
  });

  document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("pointerup", () => {
    isDragging = false;
  });

  closeBtn.addEventListener("click", () => {
    win.style.display = "none";
  });

  footerCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      win.style.display = "none";
    });
  });
});

//  EFFECT CARD
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");

    document.body.classList.remove("preload"); // ← INI PENTING

    const cards = document.querySelectorAll(".effect__card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 450);
    });

  }, 500);
});













