/* ==========================================================================
   ADVANCED SCROLL TRANSFORMATIONS ENGINE (3D DECK & HORIZONTAL SCROLL)
   ========================================================================== */

class ScrollTransformEngine {
  constructor() {
    this.initScrollProgress();
    this.init3DCardTilt();
    this.init3DDeckScrollTransform();
    this.initHorizontalScroll();
    this.initSkillMeters();
    this.initMagneticCursor();
  }

  /* --- Top Bar Scroll Progress --- */
  initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (progressBar) progressBar.style.width = scrolled + '%';

      // Navbar shrink on scroll
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (winScroll > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  }

  /* --- Hero & Card 3D Mouse Tilt Effect --- */
  init3DCardTilt() {
    const heroCard = document.querySelector('.avatar-3d-card');
    if (!heroCard) return;

    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -16;
      const rotateY = ((x - centerX) / centerX) * 16;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  /* --- 3D Deck Stacking Scroll Transformation --- */
  init3DDeckScrollTransform() {
    const cards = document.querySelectorAll('.project-card-3d');
    if (!cards.length) return;

    const onScroll = () => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const parentTop = rect.top;
        const windowHeight = window.innerHeight;

        // Calculate progress as card moves up sticky viewport
        let progress = (windowHeight - parentTop) / windowHeight;
        progress = Math.max(0, Math.min(1, progress));

        // Calculate transformations
        if (parentTop <= 140) {
          // Card is stuck / stacking under next items
          const distanceStuck = 140 - parentTop;
          const scale = Math.max(0.85, 1 - distanceStuck * 0.0006);
          const rotateX = Math.min(12, distanceStuck * 0.04);
          const blur = Math.min(6, distanceStuck * 0.015);

          card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale})`;
          card.style.filter = `blur(${blur}px)`;
          card.style.opacity = `${Math.max(0.4, 1 - distanceStuck * 0.0015)}`;
        } else {
          // Card approaching top
          const rotateX = (1 - progress) * 10;
          card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(1)`;
          card.style.filter = 'blur(0px)';
          card.style.opacity = '1';
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* --- Horizontal Scroll Showcase Engine --- */
  initHorizontalScroll() {
    const container = document.querySelector('.horizontal-scroll-container');
    const track = document.querySelector('.horizontal-track');
    const fill = document.querySelector('.horizontal-progress-fill');
    if (!container || !track) return;

    window.addEventListener('scroll', () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if container is in scroll view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalScrollable = container.offsetHeight - windowHeight;
        const currentScroll = windowHeight - rect.top;
        let percentage = currentScroll / (rect.height);
        percentage = Math.max(0, Math.min(1, percentage));

        const maxTranslate = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
        const translateX = -1 * (percentage * maxTranslate);

        track.style.transform = `translateX(${translateX}px)`;
        if (fill) fill.style.width = `${(percentage * 100).toFixed(1)}%`;
      }
    });
  }

  /* --- Skill Radar & Progress Meters --- */
  initSkillMeters() {
    const skillCards = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-bar-fill');
          if (fill) {
            const targetWidth = fill.getAttribute('data-percentage') || '85%';
            fill.style.width = targetWidth;
          }
        }
      });
    }, { threshold: 0.2 });

    skillCards.forEach(card => observer.observe(card));
  }

  /* --- Custom Cursor Magnetic Physics --- */
  initMagneticCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(render);
    };
    render();

    // Hover elements magnet effect
    const hoverables = document.querySelectorAll('a, button, .project-card-3d, .skill-card, .btn-icon-control');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
      el.addEventListener('mousedown', () => ring.classList.add('clicking'));
      el.addEventListener('mouseup', () => ring.classList.remove('clicking'));
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollEngine = new ScrollTransformEngine();
});
