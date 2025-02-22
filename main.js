//home page
const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')

open.addEventListener('click', () => container.classList.add('show-nav'))

close.addEventListener('click', () => container.classList.remove('show-nav'))

// path: themes 
const toggle = document.querySelector('.toggle')
toggle.addEventListener('click', (e) => {
  const html = document.querySelector('html')
  if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      e.target.innerHTML = 'Dark mode'
  } else {
      html.classList.add('dark')
      e.target.innerHTML = 'Light mode'
  }
})
//button let's play 
const openBtn = document.getElementById("open");
const playBtn = document.getElementById("playButton");

playBtn.addEventListener("click", () => {
    openBtn.click(); 
});

const closeBtn = document.getElementById("close");
const circleContainer = document.querySelector(".circle-container");

openBtn.addEventListener("click", () => {
    circleContainer.classList.add("show-nav");
});

closeBtn.addEventListener("click", () => {
    circleContainer.classList.remove("show-nav");
});
//screen loading
const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0

let int = setInterval(blurring, 30)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  loadText.innerText = `${load}%`
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

// crazy title 
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".crazy-title");
  title.innerHTML = title.textContent
      .split("")
      .map((char, i) => `<span style="animation-delay:${i * 0.1}s">${char}</span>`)
      .join("");

//somke effect
  const canvas = document.getElementById("smokeCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  function createParticle() {
      return {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2 - 100,
          size: Math.random() * 20 + 5,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * -3 - 1,
          opacity: 1
      };
  }

  function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.push(createParticle());

      for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.opacity -= 0.02;
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
      }
      particles.filter(p => p.opacity > 0);
      requestAnimationFrame(animateParticles);
  }

  animateParticles();
});
