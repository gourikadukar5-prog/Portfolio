/* =============================================
   SAMRUDDHI MEN  — PORTFOLIO JS
   Matrix Rain | Typing Effect | Animations
   ============================================= */

// ── Matrix Canvas Rain ───────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()=+*#@!?;:$%^&|';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px "Fira Code", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 55);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });
})();


// ── Navbar Scroll Effect ──────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close nav on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });
})();


// ── Terminal Typing Effect (Hero) ─────────────
(function initTerminal() {
  const cmdEl = document.getElementById('typed-cmd');
  const outputEl = document.getElementById('terminal-output');

  const sequence = [
    {
      cmd: 'whoami',
      output: '<span style="color:#00ff88">samruddhi_men</span>',
      delay: 800
    },
    {
      cmd: 'cat skills.json',
      output: `<span style="color:#c792ea">["JavaScript", "React", "Node.js",</span>
<span style="color:#c792ea"> "Python", "MongoDB", "Docker"]</span>`,
      delay: 800
    },
    {
      cmd: 'git log --oneline -3',
      output: `<span style="color:#fbbf24">a3f12bc</span> Add AI chat module
<span style="color:#fbbf24">7e9d0f1</span> Fix performance bugs
<span style="color:#fbbf24">2c84a5e</span> Deploy e-commerce app`,
      delay: 800
    },
    {
      cmd: 'echo "Available for work 🚀"',
      output: '<span style="color:#00ff88">Available for work 🚀</span>',
      delay: 0
    },
  ];

  let seqIdx = 0;

  async function typeText(el, text, speed = 60) {
    el.textContent = '';
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await sleep(speed);
    }
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function runSequence() {
    while (seqIdx < sequence.length) {
      const step = sequence[seqIdx];
      outputEl.innerHTML = '';
      await typeText(cmdEl, step.cmd, 65);
      await sleep(300);

      const out = document.createElement('div');
      out.innerHTML = step.output;
      out.style.opacity = '0';
      out.style.transition = 'opacity 0.3s';
      outputEl.appendChild(out);
      requestAnimationFrame(() => { out.style.opacity = '1'; });

      await sleep(step.delay + 1200);
      seqIdx++;
    }
    // loop
    seqIdx = 0;
    outputEl.innerHTML = '';
    await sleep(1000);
    runSequence();
  }

  setTimeout(runSequence, 800);
})();


// ── Role Typing Effect ────────────────────────
(function initRoleTyper() {
  const roles = [
    'Full-Stack Developer',
    'Problem Solver',
    'Open Source Contributor',
    'Code Craftsman',
    'Tech Enthusiast',
  ];

  const el = document.getElementById('role-text');
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const role = roles[roleIdx];
    if (!deleting) {
      el.textContent = role.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === role.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    } else {
      el.textContent = role.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 1200);
})();


// ── Scroll Reveal ─────────────────────────────
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.skill-category, .project-card, .about-grid, .contact-grid, .section-header'
  );

  // Add reveal class dynamically
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when visible
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Also observe skill bars specifically
  document.querySelectorAll('.skill-card').forEach(card => {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelector('.skill-fill')?.classList.add('animated');
        }
      });
    }, { threshold: 0.5 });
    barObserver.observe(card);
  });
})();


// ── Smooth Button Magnetic Effect ─────────────
(function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


// ── Project Card 3D Tilt ──────────────────────
(function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ── Contact Form ──────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Simulate sending
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
    form.reset();
    successMsg.style.display = 'block';

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  });
})();


// ── Active Nav on Load ────────────────────────
(function setInitialNav() {
  const firstLink = document.querySelector('.nav-link[data-section="home"]');
  if (firstLink) firstLink.classList.add('active');
})();


// ── Glitch on hero name hover ─────────────────
(function initGlitch() {
  const name = document.querySelector('.hero-name');
  if (!name) return;

  name.addEventListener('mouseenter', () => {
    name.style.animation = 'glitch 0.4s ease';
    setTimeout(() => { name.style.animation = ''; }, 400);
  });
})();

// Inject glitch CSS
(function injectGlitch() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch {
      0%   { transform: translate(0); }
      20%  { transform: translate(-3px, 2px); filter: hue-rotate(30deg); }
      40%  { transform: translate(3px, -2px); filter: hue-rotate(-30deg); }
      60%  { transform: translate(-2px, 1px); filter: hue-rotate(90deg); }
      80%  { transform: translate(2px, -1px); }
      100% { transform: translate(0); filter: none; }
    }
  `;
  document.head.appendChild(style);
})();

// ── Particle Cursor Trail ─────────────────────
(function initCursorTrail() {
  const colors = ['#00ff88', '#00d4ff', '#c792ea', '#fbbf24'];
  let particles = [];

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.9;
        transform: translate(-50%, -50%);
        transition: none;
      `;
      document.body.appendChild(p);
      particles.push({ el: p, life: 1, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 });
    }
  });

  function animateParticles() {
    particles = particles.filter(p => {
      p.life -= 0.04;
      p.el.style.opacity = p.life;
      const x = parseFloat(p.el.style.left) + p.vx;
      const y = parseFloat(p.el.style.top) + p.vy;
      p.el.style.left = x + 'px';
      p.el.style.top = y + 'px';
      p.el.style.width = (5 * p.life) + 'px';
      p.el.style.height = (5 * p.life) + 'px';

      if (p.life <= 0) {
        p.el.remove();
        return false;
      }
      return true;
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
})();


// ── Page Load Animation ───────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
