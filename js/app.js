/* ==========================================================================
   APP MAIN CONTROLLER & FULL-STACK DATABASE LOGIC SIMULATION
   ========================================================================== */

class AppController {
  constructor() {
    this.soundEnabled = false;
    this.audioCtx = null;
    this.initTheme();
    this.initSoundSynth();
    this.initFilterBar();
    this.initContactDatabase();
    this.initSandbox();
  }

  /* --- Theme System --- */
  initTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme') || 'obsidian';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeMenu = document.getElementById('theme-picker-menu');

    if (themeToggleBtn && themeMenu) {
      themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('active');
        this.playAudioSynth(800, 0.05);
      });

      document.addEventListener('click', () => {
        themeMenu.classList.remove('active');
      });

      const options = themeMenu.querySelectorAll('.theme-option');
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          const theme = opt.getAttribute('data-theme');
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('portfolio_theme', theme);
          themeMenu.classList.remove('active');
          this.playAudioSynth(1200, 0.1);
        });
      });
    }
  }

  /* --- Web Audio API Synth --- */
  initSoundSynth() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      soundBtn.innerHTML = this.soundEnabled ? `<i data-lucide="volume-2"></i>` : `<i data-lucide="volume-x"></i>`;
      soundBtn.style.color = this.soundEnabled ? 'var(--accent-secondary)' : 'var(--text-muted)';
      if (window.lucide) window.lucide.createIcons();

      if (this.soundEnabled) {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContext();
        }
        this.playAudioSynth(600, 0.08);
      }
    });
  }

  playAudioSynth(freq = 440, duration = 0.05) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Synth error", e);
    }
  }

  /* --- Projects Category Filter --- */
  initFilterBar() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card-3d');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        this.playAudioSynth(900, 0.05);

        cards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'grid';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  /* --- Contact Database & Recruiter Logbook --- */
  initContactDatabase() {
    const form = document.getElementById('contact-form');
    const tableBody = document.getElementById('logbook-tbody');

    const renderLogbook = () => {
      if (!tableBody) return;
      const stored = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      if (stored.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-dim); padding: 20px;">No recruiter inquiries recorded yet. Be the first to submit!</td></tr>`;
        return;
      }

      tableBody.innerHTML = stored.map(msg => `
        <tr>
          <td><strong style="color: var(--text-main);">${msg.name}</strong></td>
          <td><span style="color: var(--accent-secondary); font-family: var(--font-code); font-size: 0.8rem;">${msg.budget}</span></td>
          <td style="max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${msg.message}</td>
          <td><span style="font-size: 0.75rem; color: var(--text-dim);">${msg.timestamp}</span></td>
        </tr>
      `).join('');
    };

    renderLogbook();

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const budget = document.getElementById('form-budget').value;
        const message = document.getElementById('form-message').value;

        if (!name || !email || !message) {
          alert('Please fill out all required fields.');
          return;
        }

        const newMsg = {
          name,
          email,
          budget,
          message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const existing = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        existing.unshift(newMsg);
        localStorage.setItem('portfolio_messages', JSON.stringify(existing));

        this.playAudioSynth(1400, 0.2);

        // Show submission confirmation alert / status
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.innerHTML = `✓ Message Sent Successfully!`;
          submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          setTimeout(() => {
            submitBtn.innerHTML = `Send Inquiry <i data-lucide="send"></i>`;
            submitBtn.style.background = '';
            if (window.lucide) window.lucide.createIcons();
          }, 3000);
        }

        form.reset();
        renderLogbook();
      });
    }
  }

  /* --- Interactive Code Sandbox --- */
  initSandbox() {
    const sandboxCode = document.getElementById('sandbox-code');
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-skill');
        if (SKILL_SNIPPETS[cat] && sandboxCode) {
          sandboxCode.textContent = SKILL_SNIPPETS[cat];
          this.playAudioSynth(1100, 0.05);

          // Scroll smoothly to sandbox
          const sandbox = document.querySelector('.sandbox-drawer');
          if (sandbox) sandbox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.appController = new AppController();
});
