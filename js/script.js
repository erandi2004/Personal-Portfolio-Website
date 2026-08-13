/* ==========================================================================
   Erandi Dewmini - Personal Portfolio JavaScript
   Includes: Three.js 3D Hero Animation, Typing Text, Project Filtering,
   Modal Popups, Form Validation, Scroll Reveals & Custom Cursor
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core interactive modules
  initCursorGlow();
  initThreeHeroAnimation();
  initTypingEffect();
  initNavbar();
  initScrollReveals();
  initProjectFiltersAnd3DTilt();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initSkillBars();
});

/* --------------------------------------------------------------------------
   1. Mouse Following Glow Effect
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  // Track mouse movements smoothly
  window.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
}

/* --------------------------------------------------------------------------
   2. Three.js 3D Futuristic Hero IoT/Network Animation
   -------------------------------------------------------------------------- */
function initThreeHeroAnimation() {
  const container = document.getElementById('hero-canvas');
  if (!container || typeof THREE === 'undefined') {
    console.warn('Three.js library not loaded or canvas container missing. WebGL fallback active.');
    return;
  }

  // Check WebGL Support
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable()) {
    console.warn('WebGL is not supported in this browser. Graceful fallback executed.');
    return;
  }

  // Scene & Camera setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Determine node & particle count based on screen size (mobile performance optimization)
  const isMobile = window.innerWidth <= 768;
  const nodeCount = isMobile ? 45 : 110;
  const particleCount = isMobile ? 120 : 350;

  const networkGroup = new THREE.Group();
  scene.add(networkGroup);

  // 1. Glowing Network Nodes & Lines Structure
  const nodesGeometry = new THREE.BufferGeometry();
  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeVelocities = [];

  for (let i = 0; i < nodeCount; i++) {
    const x = (Math.random() - 0.5) * 45;
    const y = (Math.random() - 0.5) * 35;
    const z = (Math.random() - 0.5) * 35;

    nodePositions[i * 3] = x;
    nodePositions[i * 3 + 1] = y;
    nodePositions[i * 3 + 2] = z;

    nodeVelocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    });
  }

  nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

  // Node Points Material
  const nodeMaterial = new THREE.PointsMaterial({
    color: 0x00ff88,
    size: isMobile ? 0.4 : 0.6,
    transparent: true,
    opacity: 0.85
  });

  const nodePoints = new THREE.Points(nodesGeometry, nodeMaterial);
  networkGroup.add(nodePoints);

  // Line Segments connecting nearby nodes
  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.25
  });

  const linesGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(nodeCount * nodeCount * 6);
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
  networkGroup.add(linesMesh);

  // 2. Ambient Particles Background Cloud
  const particlesGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 80;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x39ff14,
    size: 0.25,
    transparent: true,
    opacity: 0.4
  });

  const particleCloud = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleCloud);

  // Parallax Mouse Interactions
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth Parallax Interpolation
    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    networkGroup.rotation.y = elapsedTime * 0.05 + currentMouseX * 0.3;
    networkGroup.rotation.x = elapsedTime * 0.03 + currentMouseY * 0.3;
    particleCloud.rotation.y = elapsedTime * 0.02;

    // Update Node positions & Dynamic Connecting Lines
    const positions = nodesGeometry.attributes.position.array;
    let lineIndex = 0;
    const linePosArray = linesGeometry.attributes.position.array;
    const connectDistance = 12;

    for (let i = 0; i < nodeCount; i++) {
      // Bounce velocity
      positions[i * 3] += nodeVelocities[i].x;
      positions[i * 3 + 1] += nodeVelocities[i].y;
      positions[i * 3 + 2] += nodeVelocities[i].z;

      if (Math.abs(positions[i * 3]) > 25) nodeVelocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 20) nodeVelocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 20) nodeVelocities[i].z *= -1;

      // Connect lines to nearby nodes
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectDistance) {
          linePosArray[lineIndex++] = positions[i * 3];
          linePosArray[lineIndex++] = positions[i * 3 + 1];
          linePosArray[lineIndex++] = positions[i * 3 + 2];

          linePosArray[lineIndex++] = positions[j * 3];
          linePosArray[lineIndex++] = positions[j * 3 + 1];
          linePosArray[lineIndex++] = positions[j * 3 + 2];
        }
      }
    }

    nodesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.setDrawRange(0, lineIndex / 3);
    linesGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive Window Resize Listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* --------------------------------------------------------------------------
   3. Animated Typing Text Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const targetElement = document.getElementById('typing-text');
  if (!targetElement) return;

  const titles = [
    'IoT Engineer',
    'Software Developer',
    'Web Developer',
    'Embedded Systems Enthusiast',
    'Electrical Engineering Student'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 50;
  const pauseDuration = 2000;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      targetElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentTitle.length) {
      currentSpeed = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      currentSpeed = 400;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Navbar Behavior & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll threshold for dynamic background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active menu item based on scroll position
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    '.section-header, .cyber-card, .timeline-item, .skill-card, .project-card, .activity-card, .cv-box, .contact-item'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
  });
}

/* --------------------------------------------------------------------------
   6. Project Filtering & 3D Perspective Tilt on Cards
   -------------------------------------------------------------------------- */
function initProjectFiltersAnd3DTilt() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 3D Perspective Tilt Effect
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 15;
      const rotateY = (x - centerX) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   7. Project Details Modal Dialog
   -------------------------------------------------------------------------- */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const viewDetailBtns = document.querySelectorAll('.btn-view-details');

  if (!modal) return;

  const projectDetailsMap = {
    'Hospital management system': {
      title: 'Arogya Hospital Management System',
      category: 'SOFTWARE DEVELOPMENT / C PROGRAMMING',
      problem: 'Managing patient information manually can cause duplicated records, data-entry errors, and difficulties when searching or updating hospital information.',
      solution: 'Developed a console-based hospital management system that supports patient registration, viewing, searching, updating, and deleting. The system also provides a dashboard displaying patient statistics and stores records locally using binary file handling.',
      contribution: 'Designed the complete system structure, patient data model, menu interface, CRUD operations, input-validation methods, duplicate ID prevention, search functionality, and file-based data storage using the C programming language.',
      technologies: ['C Programming','C11', 'Visual Studio','GCC','Structures','Functions','Binary File Handling','Input Validation','CRUD Operations']
    },
    'gpa-calculator': {
      title: 'GPA Calculator Android App',
      category: 'MOBILE APPLICATION DEVELOPMENT',
      problem: 'Manually calculating GPA using multiple course grades and credit values can be time-consuming and may result in mathematical errors.',
      solution: 'Developed a user-friendly Android application that allows students to enter course grades and credit values, validates the provided inputs, and automatically calculates the final Grade Point Average using a credit-weighted calculation method.',
      contribution: 'Designed the mobile user interface, developed the GPA calculation logic, implemented input validation, added multiple course-entry management, and tested the application to ensure accurate and reliable results.',
      technologies: ['Android Studio', 'Kotlin', 'Android SDK', 'XML UI Design', 'GPA Calculation Logic', 'Input Validation','Mobile UI/UX']
    },
    'electrocalc': {
      title: 'ElectroCalc – Electrical Engineering Calculator',
      category: 'Software Engineering',
      problem: 'Engineering students and technicians spend significant time performing repetitive manual electrical calculations and unit conversions.',
      solution: 'Built a sleek standalone electrical engineering calculator application featuring Ohm\'s Law, Series/Parallel impedance, 1-Phase & 3-Phase power, and resistor color code lookup.',
      contribution: 'Designed clean dark-mode UI, implemented underlying mathematical algorithms, unit converters, and persistent calculation history state.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Electrical Engineering Math', 'Responsive Web App']
    },
    
    'library-system': {
      title: 'Library Book Management System',
      category: 'Desktop Software',
      problem: 'Manual paper-based library record keeping causes lost books, inaccurate student loan tracking, and inefficient book returns.',
      solution: 'Developed a robust Windows desktop management system handling student profiles, book inventories, issue records, fine calculations, and automated report generation.',
      contribution: 'Designed database schema in SQL Server LocalDB, built C# WinForms frontend UI, and implemented full CRUD record management logic.',
      technologies: ['C#', '.NET WinForms', 'SQL Server LocalDB', 'ADO.NET', 'Visual Studio']
    }
  };

  viewDetailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details) {
        document.getElementById('modal-title').textContent = details.title;
        document.getElementById('modal-category').textContent = details.category;
        document.getElementById('modal-problem').textContent = details.problem;
        document.getElementById('modal-solution').textContent = details.solution;
        document.getElementById('modal-contribution').textContent = details.contribution;

        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        details.technologies.forEach((tech) => {
          const badge = document.createElement('span');
          badge.className = 'tech-badge';
          badge.textContent = tech;
          techContainer.appendChild(badge);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Skill Progress Bars Animation
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fillBar = entry.target.querySelector('.skill-bar-fill');
        if (fillBar) {
          const targetWidth = fillBar.getAttribute('data-level') || '80%';
          fillBar.style.width = targetWidth;
        }
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach((card) => observer.observe(card));
}

/* --------------------------------------------------------------------------
   9. Contact Form Client Validation & Toast
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all required fields.', true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', true);
      return;
    }

    // Success feedback
    /* Note: To enable live EmailJS integration, place your EmailJS credentials here:
       emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
         from_name: name,
         reply_to: email,
         subject: subject,
         message: message
       });
    */

    showToast('Message sent successfully! Sadil will reply soon.');
    form.reset();
  });

  function showToast(msg, isError = false) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.borderColor = isError ? '#ff4d4d' : 'var(--green-primary)';
    toast.style.color = isError ? '#ff4d4d' : 'var(--green-primary)';
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

/* --------------------------------------------------------------------------
   10. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
