// Canvas para partículas leves de corações no fundo
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Criar array de corações no fundo
const hearts = Array.from({ length: 20 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 8 + 6,
  speedY: Math.random() * 0.6 + 0.3,
  speedX: Math.sin(Math.random() * Math.PI) * 0.2,
  opacity: Math.random() * 0.4 + 0.2
}));

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgba(230, 57, 70, ${opacity})`;
  ctx.beginPath();
  const topCurve = size * 0.3;
  ctx.moveTo(0, topCurve);
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurve);
  ctx.bezierCurveTo(-size / 2, (size + topCurve) / 2, 0, size, 0, size);
  ctx.bezierCurveTo(0, size, size / 2, (size + topCurve) / 2, size / 2, topCurve);
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurve);
  ctx.fill();
  ctx.restore();
}
function animate() {
  ctx.clearRect(0, 0, width, height);

  hearts.forEach(h => {
    h.y -= h.speedY;
    h.x += h.speedX;

    if (h.y < -20) {
      h.y = height + 20;
      h.x = Math.random() * width;
    }

    drawHeart(h.x, h.y, h.size, h.opacity);
  });

  requestAnimationFrame(animate);
}

animate();

// Lógica de abrir e fechar a mensagem (Modal)
const modal = document.getElementById('noteModal');
const openBtn = document.getElementById('openNoteBtn');
const closeBtn = document.getElementById('closeNoteBtn');
const mainHeart = document.getElementById('mainHeart');

function openModal() {
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
mainHeart.addEventListener('click', openModal);

// Fechar se clicar no fundo escuro fora do cartão
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});