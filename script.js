/**
 * Professional Portfolio JavaScript Core Engine
 * Author: Alex Morgan
 * Features:
 * - Preloader Screen Fade Out
 * - Animated Interactive Particle Canvas Background
 * - Sticky Navbar & Mobile Hamburger Menu
 * - Hero Typing Effect
 * - Pure JS Scroll Reveal Observer
 * - Counter Stats Animation
 * - Animated Skill Progress Bars
 * - Project Category Filtering
 * - Form Validation with Live Feedback
 * - Back to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==================== 1. PRELOADER SCREEN ====================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 500);
    });
  }

  // ==================== 2. CANVAS PARTICLE BACKGROUND ====================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    }

    initParticles();
    window.addEventListener('resize', initParticles);

    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
  }

  // ==================== 3. STICKY NAVBAR & ACTIVE SCROLL LINK ====================
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link updating based on viewport
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==================== 4. HERO TYPING EFFECT ====================
  const typedTextSpan = document.querySelector('.typed-text');
  const textArray = [
    'Full Stack Software Engineer',
    'UI/UX Design Architect',
    'Cloud Systems Developer',
    'Open Source Contributor'
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay + 500);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, newTextDelay + 200);
  }

  // ==================== 5. SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==================== 6. STATS COUNTER ANIMATION ====================
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function runStatsCounter() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 2000; // ms
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          runStatsCounter();
          animatedStats = true;
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // ==================== 7. SKILL PROGRESS BAR ANIMATION ====================
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = `${progress}%`;
        });
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // ==================== 8. PROJECT CATEGORY FILTERING ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ==================== 9. CONTACT FORM VALIDATION ====================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formFeedback = document.getElementById('formFeedback');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.style.borderColor = '#ef4444';
  }

  function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.style.borderColor = '';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameError = document.getElementById('nameError');
      if (!nameInput.value.trim()) {
        showError(nameInput, nameError, 'Name is required.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters.');
        isValid = false;
      } else {
        clearError(nameInput, nameError);
      }

      // Validate Email
      const emailError = document.getElementById('emailError');
      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Email address is required.');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // Validate Subject
      const subjectError = document.getElementById('subjectError');
      if (!subjectInput.value.trim()) {
        showError(subjectInput, subjectError, 'Subject is required.');
        isValid = false;
      } else {
        clearError(subjectInput, subjectError);
      }

      // Validate Message
      const messageError = document.getElementById('messageError');
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError, 'Message content is required.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, 'Message should be at least 10 characters long.');
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate network API submission
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
          contactForm.reset();

          setTimeout(() => {
            formFeedback.className = 'form-feedback';
            formFeedback.style.display = 'none';
          }, 6000);
        }, 1500);
      }
    });
  }

  // ==================== 10. BACK TO TOP BUTTON ====================
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
