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

//  HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
  document.querySelector(".navbar").classList.toggle("active");
});

// DATA popup
const skillData = {
  HTML: {
    title: "HTML",
    level: 70,
    levelText: "Intermediate",
    desc: "I build clean and structured layouts using semantic HTML for better accessibility and performance.",
    icon: "../assets/html.png",
    color : "#e64c18"
  },
  CSS: {
    title: "CSS",
    level: 60,
    levelText: "Intermediate",
    desc: "I design responsive and visually consistent interfaces using modern CSS techniques.",
    icon: "../assets/css.png", 
    color : "#004ce8"
  },
  JavaScript: {
    title: "JavaScript",
    level: 65,
    levelText: "Intermediate",
    desc: "I add interactivity and dynamic behavior to web pages using core JavaScript fundamentals.",
    icon: "../assets/javascript.png",
    color : "#fad725"
  },
  TypeScript: {
    title: "TypeScript",
    level: 55,
    levelText: "Intermediate",
    desc: "I write more reliable and maintainable code with TypeScript’s static typing and tooling benefits.",
    icon: "../assets/typescript.png" ,
    color : "#0078cf"
  },
  React: {
    title: "React",
    level: 65,
    levelText: "Intermediate",
    desc: "I build modular, reactive UI components and manage state efficiently using React’s ecosystem.",
    icon: "../assets/react.png",
    color : "#61dbfb"
  },
  TailwindCSS: {
    title: "TailwindCSS",
    level: 60,
    levelText: "Intermediate",
    desc: "I style interfaces quickly and consistently using Tailwind’s utility-first workflow.",
    icon: "../assets/tailwind.png",
    color: "#35bef8"
  },
  NodeJS: {
    title: "Node.js",
    displayName: "Node.js",
    level: 65,
    levelText: "Intermediate",
    desc: "I create scalable backend services and APIs using JavaScript on the server.",
    icon: "../assets/nodejs.png",
    color: "#6ca55f"
  },
  BUN: {
    title: "BUN",
    level: 40,
    levelText: "Beginner",
    desc: "I use Bun for fast development workflows, including API creation and script execution.",
    icon: "../assets/bun.png",
    color: "#665c59"
  },
  PHP: {
    title: "PHP",
    level: 60,
    levelText: "Intermediate",
    desc: "I develop server-side logic and dynamic web features using PHP fundamentals.",
    icon: "../assets/php.png",
    color: "#484c89"
  },
  MySQL: {
    title: "MySQL",
    level: 40,
    levelText: "Beginner",
    desc: "I design and manage relational databases using structured queries and optimized schemas.",
    icon: "../assets/mysql.png",
    color: "#ce8b2c"
  },
  npm: {
    title: "npm",
    level: 30,
    levelText: "Beginner",
    desc: "I manage project dependencies and scripts efficiently using npm.",
    icon: "../assets/npm.png",
    color: "#d50100"
  },
  Git: {
    title: "Git",
    level: 45,
    levelText: "Intermediate",
    desc: "I track changes and manage versions effectively through Git workflows.",
    icon: "../assets/git.png",
    color: "#f05033" 
  },
  GitHub: {
    title: "GitHub",
    level: 55,
    levelText: "Intermediate",
    desc: "I collaborate, review code, and deploy projects using GitHub repositories.",
    icon: "../assets/origithub.png",
    color: "#111"
  },
  VSCode: {
    title: "VS Code",
    displayName: "VS Code",
    level: 60,
    levelText: "Intermediate",
    desc: "I work efficiently with VS Code’s extensions, shortcuts, and workflow tools.",
    icon: "../assets/vscode.png",
    color: "#1faff3"
  },
  Figma: {
    title: "Figma",
    level: 38,
    levelText : "Beginner",
    desc: "I create UI designs and prototypes that translate smoothly into development.",
    icon: "../assets/figma.png",
    color: "#f24d18"
  },
  cpp: {
    title: "C++",
    displayName: "C++",
    level: 20,
    levelText: "Beginner",
    desc: "I’m exploring C++ to understand lower-level programming and system concepts.",
    icon: "../assets/c++.png",
    color: "#00589d"
  },
  unity: {
    title: "Unity (C#)",
    displayName: "Unity (C#)",
    level: 30,
    levelText: "Beginner",
    desc: "I create basic gameplay mechanics and interactive scenes using Unity and C# scripting.",
    icon: "../assets/csharp.png",
    color: "#360092"
  },
  ElysiaJS: {
    title: "ElysiaJS",
    level: 25,
    levelText: "Beginner",
    desc: "I experiment with ElysiaJS to build lightweight and modern backend APIs on Bun.",
    icon: "../assets/elysia.png",
    color: "#c154f8ff"
  }
};

// ===============================
// ELEMENT SELECTOR
// ===============================
const tags = document.querySelectorAll(".tag.pop");
const overlay = document.getElementById("skillPopupOverlay");
const popup = document.getElementById("skillPopup");
const bar = document.getElementById("skillBar");
const levelText = document.getElementById("skillLevelText");
const desc = document.getElementById("skillDesc");
const iconBox = document.getElementById("skillIcon"); 

// ===============================
// BUKA POPUP
// ===============================
tags.forEach(tag => {
  tag.addEventListener("click", () => {

    let name = tag.textContent.trim();
    if (name === "Node.js") name = "NodeJS";
    if (name === "VS Code") name = "VSCode";
    if (name === "C++") name = "cpp";
    if (name === "Unity (C#)") name = "unity";
    const info = skillData[name];
    if (!info) return;

    if (typeof info.icon === "string" && (info.icon.endsWith(".png") || info.icon.endsWith(".jpg") || info.icon.endsWith(".jpeg") || info.icon.endsWith(".svg"))) {
      iconBox.src = info.icon;   
      iconBox.alt = name + " icon"; 
    } else {
      iconBox.src = "";        
      iconBox.alt = "";         
      iconBox.textContent = info.icon; 
    }

    //TITLE
    skillTitle.textContent = info.title

    
    // BAR SKILL
    skillBar.style.background = info.color;
    bar.style.width = info.level + "%";

    const pointer = document.getElementById("skillPointer");
    pointer.style.left = info.level + "%";
    
    // TEKS LEVEL & DESKRIPSI
    levelText.textContent = info.levelText;
    desc.textContent = info.desc;

    // TAMPILKAN POPUP
    overlay.style.display = "block";
    popup.style.display = "block";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";

    // (BARU) LOCK SCROLL saat popup buka
    document.body.classList.add("popup-open"); 
  });
});

popup.addEventListener("mousedown", () => {
  popup.classList.add("noselect");
});

document.addEventListener("mouseup", () => {
  popup.classList.remove("noselect");
});


// TUTUP POPUP (klik overlay)
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  popup.style.display = "none";

  // (BARU) BALIKIN SCROLL
  document.body.classList.remove("popup-open");
});

// ===============================
// DRAGGABLE POPUP
// ===============================
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// klik mouse turun di popup
popup.addEventListener("mousedown", (e) => {
  isDragging = true;

  // posisi mouse relatif terhadap popup
  offsetX = e.clientX - popup.getBoundingClientRect().left;
  offsetY = e.clientY - popup.getBoundingClientRect().top;

  popup.style.transition = "none"; // (baru) biar ga ngelag pas ditarik
});

// lepas klik mouse
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// gerakkan popup saat mouse digerakkan
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  popup.style.left = `${e.clientX - offsetX}px`;
  popup.style.top = `${e.clientY - offsetY}px`;

  // hilangkan transform biar posisi manual aktif
  popup.style.transform = "none";
});

// ambil element
const eduItems = document.querySelectorAll('.edu__item');
const eduRight = document.getElementById('eduRight');
const eduDetail = document.getElementById('eduDetail');

// data sekolahmu
const eduData = {
  e1: {
    logo: "../assets/unsri.svg",
    title: "Universitas Sriwijaya",
    prodi: "Bachelor of Computer Science",
    desc: "The launchpad for my professional engineering career, where I deeply explore computer science and cultivate my philosophy of writing clean, structured code."
  },

};

// hanya 1 event listener untuk handle semuanya
eduItems.forEach(item => {
  item.addEventListener('click', () => {

    const target = item.dataset.target;
    const isActive = item.classList.contains("active");

    // tutup semuanya dulu
    eduItems.forEach(i => i.classList.remove("active"));

    // kalau sebelumnya belum aktif → buka
    if (!isActive) {
      item.classList.add("active");

      // sembunyi eduRight
      eduRight.style.display = "none";

      // tampilkan eduDetail
      eduDetail.style.display = "flex";

      // isi konten detail
      document.getElementById("detailLogo").src = eduData[target].logo;
      document.getElementById("detailTitle").textContent = eduData[target].title;
      document.getElementById("detailProdi").textContent = eduData [target].prodi;
      document.getElementById("detailDesc").textContent = eduData[target].desc;

    } else {
      // kalau diklik lagi → tutup dan kembali ke default
      eduRight.style.display = "block";
      eduDetail.style.display = "none";
    }
  });
});

const projects = {
  portfolio: {
    title: "Personal Portfolio",
    desk: "A personal portfolio website built to showcase my skills, projects, and growth as a developer through a clean and responsive design.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveDemo: "",
    github: "https://github.com/kyohiiro",
  },

  game: {
    title: "Unity Game Prototype",
    desk: "A Unity game prototype created as a learning project to explore game development, strengthen problem-solving skills, and experiment with gameplay systems.",
    tech: ["Unity", "C#"],
    liveDemo: null,
    github: null
  }
};

// ============================
// ELEMENT SELECTOR
// ============================
const items = document.querySelectorAll(".project__item");
const title = document.getElementById("projectTitle");
const desk = document.getElementById("projectDesk");
const tech = document.getElementById("projectTech");
const liveDemoBtn = document.getElementById("liveDemoBtn");
const githubBtn = document.getElementById("githubBtn");

// ============================
// CLICK HANDLER
// ============================
items.forEach(item => {
  item.addEventListener("click", () => {
    const key = item.dataset.project;
    const data = projects[key];

    // ACTIVE STATE
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // UPDATE CONTENT
    title.textContent = data.title;
    desk.textContent = data.desk;

    tech.innerHTML = "";
    data.tech.forEach(t => {
      const span = document.createElement("span");
      span.textContent = t;
      tech.appendChild(span);
    });

    // LIVE DEMO
    if (data.liveDemo) {
      liveDemoBtn.textContent = "Live Demo";
      liveDemoBtn.href = data.liveDemo;
      liveDemoBtn.classList.remove("disabled");
    } else {
      liveDemoBtn.textContent = "In Development";
      liveDemoBtn.removeAttribute("href");
      liveDemoBtn.classList.add("disabled");
    }

    // GITHUB
    if (data.github) {
      githubBtn.href = data.github;
      githubBtn.style.display = "inline-block";
    } else {
      githubBtn.style.display = "none";
    }
  });
});

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    setTimeout(() => {
      preloader.classList.add('hide');
    }, 500);
  });









