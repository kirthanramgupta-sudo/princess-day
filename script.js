const enterButton = document.getElementById("enterButton");
const envelope = document.getElementById("envelope");
const letterCard = document.getElementById("letterCard");
const photoUpload = document.getElementById("photoUpload");
const photoGrid = document.getElementById("photoGrid");
const musicPanel = document.getElementById("musicPanel");
const musicToggle = document.getElementById("musicToggle");
const closeMusic = document.getElementById("closeMusic");
const musicUpload = document.getElementById("musicUpload");
const backgroundMusic = document.getElementById("backgroundMusic");

enterButton.addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
  burstHearts(12);
});

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  letterCard.hidden = false;
  envelope.querySelector(".envelope-label").textContent = "Your letter is open ♡";
  setTimeout(() => letterCard.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
  burstHearts(18);
});

photoUpload.addEventListener("change", (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  photoGrid.innerHTML = "";
  files.slice(0, 12).forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const img = document.createElement("img");
    img.alt = "A special memory";
    img.src = URL.createObjectURL(file);
    photoGrid.appendChild(img);
  });
});

musicToggle.addEventListener("click", () => { musicPanel.hidden = false; });
closeMusic.addEventListener("click", () => { musicPanel.hidden = true; });
musicPanel.addEventListener("click", (event) => {
  if (event.target === musicPanel) musicPanel.hidden = true;
});
musicUpload.addEventListener("change", () => {
  const file = musicUpload.files && musicUpload.files[0];
  if (!file) return;
  backgroundMusic.src = URL.createObjectURL(file);
  backgroundMusic.play().catch(() => {
    alert("Tap the play button in the music player to start your song.");
  });
});

function burstHearts(count) {
  const holder = document.getElementById("floating-hearts");
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 24) + "px";
    heart.style.animationDuration = (3 + Math.random() * 4) + "s";
    holder.appendChild(heart);
    setTimeout(() => heart.remove(), 7500);
  }
}
setInterval(() => burstHearts(1), 1100);

// Lightweight celebratory fireworks on the final button.
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchFireworks() {
  const rect = canvas.getBoundingClientRect();
  const bursts = 5;
  for (let b = 0; b < bursts; b++) {
    const x = rect.width * (0.15 + Math.random() * 0.7);
    const y = rect.height * (0.15 + Math.random() * 0.45);
    const hue = 290 + Math.random() * 55;
    for (let i = 0; i < 42; i++) {
      const angle = (Math.PI * 2 * i) / 42;
      const speed = 1.2 + Math.random() * 3.3;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 55 + Math.random() * 25, maxLife: 80, hue });
    }
  }
  burstHearts(30);
}
document.getElementById("fireworksButton").addEventListener("click", launchFireworks);

function animate() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.025; p.vx *= 0.99; p.life--;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, ${Math.max(0, p.life / p.maxLife)})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
