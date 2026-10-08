/* ==========================================================================
   INTERACTIVE CANVAS PARTICLE ENGINE (REACTIVE BACKGROUND)
   ========================================================================== */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
    this.mouse = { x: null, y: null, radius: 180 };

    this.init();
    this.animate();
    this.addListeners();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(6, 182, 212, ',
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addListeners() {
    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off boundaries
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + p.alpha + ')';
      this.ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      // React to mouse proximity
      if (this.mouse.x !== null && this.mouse.y !== null) {
        let dx = this.mouse.x - p.x;
        let dy = this.mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - dist / this.mouse.radius)})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleEngine('bg-canvas');
});
