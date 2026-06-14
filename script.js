/**
 * THE HEAVEN CAKE - Premium Web Application Interaction Engine
 * Features: Apple-inspired micro-interactions, scroll reveals, lazy features, WhatsApp automation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (err) {
    console.error("Lucide icons initialization failed:", err);
  }

  const initializers = [
    { name: 'Loader', fn: initLoader },
    { name: 'ScrollEffects', fn: initScrollEffects },
    { name: 'MobileNav', fn: initMobileNav },
    { name: 'AdminSystem', fn: initAdminSystem },
    { name: 'ScrollReveal', fn: initScrollReveal },
    { name: 'StatsCounter', fn: initStatsCounter },
    { name: 'TestimonialsSlider', fn: initTestimonialsSlider },
    { name: 'FaqAccordion', fn: initFaqAccordion },
    { name: 'MouseParallax', fn: initMouseParallax },
    { name: 'Particles', fn: initParticles },
    { name: 'SplitTextAnimation', fn: initSplitTextAnimation },
    { name: 'WhyChooseLoop', fn: initWhyChooseLoop },
    { name: 'ScrollStack', fn: initScrollStack },
    { name: 'HeroScrollAnimation', fn: initHeroScrollAnimation },
    { name: 'CakeCustomizer', fn: initCakeCustomizer },
    { name: 'ActivityToasts', fn: initActivityToasts }
  ];

  initializers.forEach(item => {
    try {
      if (typeof item.fn === 'function') {
        item.fn();
      } else {
        console.warn(`Initializer for ${item.name} is not a function.`);
      }
    } catch (err) {
      console.error(`Failed to initialize ${item.name}:`, err);
    }
  });
});

// 1. PRELOADER SCREEN & LOGO ANIMATION
function initLoader() {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('loader-progress');
  
  if (!loader || !progressBar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflowY = 'auto'; // Enable scrolling after load
      }, 500);
    }
  }, 100);
}

// 2. SCROLL METRICS (Navbar, Scroll Progress, Scroll-To-Top)
function initScrollEffects() {
  const header = document.getElementById('main-header');
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    // A. Sticky Header Blur
    if (scrollPosition > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // B. Reading Progress
    if (totalHeight > 0) {
      const progressPercent = (scrollPosition / totalHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // C. Scroll To Top Visibility
    if (scrollPosition > 500) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }

    // D. Active Nav Link on Scroll
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 3. MOBILE NAVIGATION DRAWER
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// 4. SCROLL REVEAL (Framer Motion style transitions)
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null, // Viewport
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust bounds
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// 5. WHY CHOOSE US - STATS COUNT-UP ANIMATION
function initStatsCounter() {
  const statsSection = document.getElementById('stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');

  if (!statsSection || statNumbers.length === 0) return;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * target);

      if (target >= 1000) {
        // Format with thousands separator
        element.textContent = currentVal.toLocaleString() + '+';
      } else if (target === 99 || target === 100) {
        element.textContent = currentVal + '%';
      } else {
        element.textContent = currentVal + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(num => countUp(num));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// 6. CUSTOM AUTOPLAY TESTIMONIALS SLIDER
function initTestimonialsSlider() {
  const carousel = document.getElementById('reviews-carousel');
  const dots = document.querySelectorAll('.carousel-dot');
  const slides = document.querySelectorAll('.review-slide');

  if (!carousel || slides.length === 0) return;

  let currentIdx = 0;
  let autoplayTimer;

  const updateSlider = (idx) => {
    carousel.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[idx].classList.add('active');
    currentIdx = idx;
  };

  const nextSlide = () => {
    let nextIdx = currentIdx + 1;
    if (nextIdx >= slides.length) nextIdx = 0;
    updateSlider(nextIdx);
  };

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000); // Shift every 5 seconds
  };

  const stopAutoplay = () => {
    clearInterval(autoplayTimer);
  };

  // Click on Dots handler
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      stopAutoplay();
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      updateSlider(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

// 7. FAQ ANIMATED ACCORDION
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Collapse all FAQ items first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Toggle state of clicked item
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      }
    });
  });
}

// 8. CURSOR PARALLAX FLOATING HERO GRAPHICS
function initMouseParallax() {
  const hero = document.getElementById('home');
  const floatElems = document.querySelectorAll('.float-elem');

  if (!hero || floatElems.length === 0) return;

  hero.addEventListener('mousemove', (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calculate cursor distance from center (-0.5 to 0.5)
    const pageX = (e.clientX / width) - 0.5;
    const pageY = (e.clientY / height) - 0.5;

    floatElems.forEach((elem, index) => {
      const depth = (index + 1) * 20; // Parallax depth multiplier
      const xVal = pageX * depth;
      const yVal = pageY * depth;
      
      // Smooth movement updates
      elem.style.transform = `translate(${xVal}px, ${yVal}px)`;
    });
  });
}

// 9. SEARCH & FILTER DYNAMIC CAKES MENU
function filterCategory(element, categoryName) {
  // Update Active Pill state
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => pill.classList.remove('active'));
  element.classList.add('active');

  const productsGrid = document.getElementById('products-grid');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.getElementById('cake-search');

  // Clear search field during category shifts
  if (searchInput) searchInput.value = '';

  let visibleCount = 0;

  productCards.forEach(card => {
    const categoriesStr = card.getAttribute('data-category');
    const categoriesArray = categoriesStr.split(',').map(s => s.trim());

    if (categoryName === 'all' || categoriesArray.includes(categoryName)) {
      card.style.display = 'flex';
      visibleCount++;
      // Re-trigger scroll reveal transitions inside visible cards
      setTimeout(() => card.classList.add('revealed'), 50);
    } else {
      card.style.display = 'none';
    }
  });

  manageNoResults(visibleCount);
}

// Category selection helper from categories cards
function filterByCategory(categoryName) {
  const targetPill = Array.from(document.querySelectorAll('.filter-pill'))
    .find(pill => pill.textContent.trim().toLowerCase().includes(categoryName.substring(0, 5).toLowerCase()));
  
  if (targetPill) {
    targetPill.click();
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
  } else {
    // If not found in simple pills list
    const firstPill = document.querySelector('.filter-pill');
    if (firstPill) filterCategory(firstPill, 'all');
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    productCards.forEach(card => {
      const categoriesStr = card.getAttribute('data-category');
      const categoriesArray = categoriesStr.split(',').map(s => s.trim());
      if (categoriesArray.includes(categoryName)) {
        card.style.display = 'flex';
        visibleCount++;
        setTimeout(() => card.classList.add('revealed'), 50);
      } else {
        card.style.display = 'none';
      }
    });
    manageNoResults(visibleCount);
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
  }
}

// Live Search Input Filter
function filterCakes() {
  const query = document.getElementById('cake-search').value.toLowerCase().trim();
  const productCards = document.querySelectorAll('.product-card');
  const pills = document.querySelectorAll('.filter-pill');

  // Reset active filter pills back to 'All'
  pills.forEach(pill => pill.classList.remove('active'));
  const allPill = Array.from(pills).find(p => p.textContent.includes('All'));
  if (allPill) allPill.classList.add('active');

  let visibleCount = 0;

  productCards.forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    const categories = card.getAttribute('data-category').toLowerCase();
    const description = card.querySelector('.product-desc').textContent.toLowerCase();

    if (name.includes(query) || categories.includes(query) || description.includes(query)) {
      card.style.display = 'flex';
      visibleCount++;
      setTimeout(() => card.classList.add('revealed'), 50);
    } else {
      card.style.display = 'none';
    }
  });

  manageNoResults(visibleCount);
}

// Handles showing / hiding "No Results Found"
function manageNoResults(count) {
  const grid = document.getElementById('products-grid');
  let noResultsEl = document.getElementById('no-results-view');

  if (count === 0) {
    if (!noResultsEl) {
      noResultsEl = document.createElement('div');
      noResultsEl.id = 'no-results-view';
      noResultsEl.className = 'no-results reveal reveal-up revealed';
      noResultsEl.innerHTML = `
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
        <h3>No sweet treats match your query</h3>
        <p>Try searching for Chocolate, Velvet, Truffle, or resetting the category filter.</p>
      `;
      grid.appendChild(noResultsEl);
    }
  } else {
    if (noResultsEl) {
      noResultsEl.remove();
    }
  }
}

// 10. QUICK ORDER MODAL INTERACTION
function openOrderModal(cakeName, cakePrice, cakeImg) {
  const modal = document.getElementById('order-modal');
  const nameEl = document.getElementById('modal-cake-name');
  const priceEl = document.getElementById('modal-cake-price');
  const imgEl = document.getElementById('modal-cake-img');

  if (!modal || !nameEl || !priceEl || !imgEl) return;

  nameEl.textContent = cakeName;
  priceEl.textContent = cakePrice;
  imgEl.src = cakeImg;
  imgEl.alt = cakeName;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scroll
}

// Modal Order WhatsApp dispatch
function handleModalSubmit(event) {
  event.preventDefault();

  const cakeName = document.getElementById('modal-cake-name').textContent;
  const cakePrice = document.getElementById('modal-cake-price').textContent;
  const customerName = document.getElementById('modal-name').value;
  const cakeWeight = document.getElementById('modal-weight').value;
  const cakePreference = document.getElementById('modal-eggless').value;
  const cakeMessage = document.getElementById('modal-message').value || 'None';
  const specialInstructions = document.getElementById('modal-instructions').value || 'None';

  // Format WhatsApp String
  const phone = '919644553363'; // The Heaven Cake Kumbla WhatsApp
  const textMsg = `*The Heaven Cake - New Order Request*%0A%0A` +
                  `🎂 *Cake:* ${cakeName}%0A` +
                  `💵 *Price:* ${cakePrice}%0A` +
                  `👤 *Name:* ${customerName}%0A` +
                  `⚖️ *Weight:* ${cakeWeight}%0A` +
                  `🥚 *Eggless:* ${cakePreference}%0A` +
                  `✍️ *Message on Cake:* ${cakeMessage}%0A` +
                  `📝 *Instructions:* ${specialInstructions}`;

  const whatsappUrl = `https://wa.me/${phone}?text=${textMsg}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
  closeOrderModal();
}

// 11. GENERAL FORMS & NEWSLETTER DISPATCH
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('form-name').value;
  const phone = document.getElementById('form-phone').value;
  const date = document.getElementById('form-date').value || 'Not scheduled';
  const occasion = document.getElementById('form-cake-type').value;
  const notes = document.getElementById('form-notes').value;

  // Build WhatsApp request for Bespoke Inquiry
  const waPhone = '919644553363';
  const textMsg = `*The Heaven Cake - Bespoke Cake Inquiry*%0A%0A` +
                  `👤 *Name:* ${name}%0A` +
                  `📞 *Phone:* ${phone}%0A` +
                  `📅 *Event Date:* ${date}%0A` +
                  `🎉 *Occasion:* ${occasion}%0A` +
                  `📝 *Design Details:* ${notes}`;

  const whatsappUrl = `https://wa.me/${waPhone}?text=${textMsg}`;
  window.open(whatsappUrl, '_blank');
  
  // Reset form
  document.getElementById('contact-form').reset();
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput) {
    alert(`Thank you for subscribing! We've registered ${emailInput.value} for Sweet Alerts.`);
    emailInput.value = '';
  }
}

// 12. FLOATING PARTICLES CANVAS ANIMATION
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const numberOfParticles = 35;

  // Set canvas size matching the hero layout container
  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1; // size between 1 and 6px
      this.speedX = Math.random() * 0.4 - 0.2; // slow drift
      this.speedY = Math.random() * 0.4 - 0.2;
      
      // Select beautiful brand theme colors
      const colors = ['#C9A227', '#FADADD', '#FFE5D4', '#FFFDF9'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.5 + 0.1; // alpha
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen bounds
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();
}

// 13. SPLIT TEXT ANIMATION FOR HERO TITLE
function initSplitTextAnimation() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  // Split text content into spans (preserving any custom nested tags like <span>Heaven</span>)
  splitTextElement(title);

  // Register GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.hero-title .split-char', 
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.25,
        ease: 'power3.out',
        stagger: 0.05, // delay of 50ms per letter
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );
  }
}

// Text splitter helper preserving inner elements (like <span>Heaven</span>)
function splitTextElement(element) {
  if (!element) return;
  const nodes = Array.from(element.childNodes);
  element.innerHTML = ''; // Clear original content

  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(' ');
      words.forEach((word, wordIdx) => {
        if (word === '' && wordIdx > 0) return;
        
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        
        Array.from(word).forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'split-char';
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform, opacity';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });
        
        element.appendChild(wordSpan);
        
        if (wordIdx < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const wordSpan = document.createElement('span');
      // Inherit original classes (e.g. logo span details)
      wordSpan.className = `split-word ${node.className}`;
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      
      const text = node.textContent;
      Array.from(text).forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.style.display = 'inline-block';
        charSpan.style.willChange = 'transform, opacity';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });
      
      element.appendChild(wordSpan);
    }
  });
}

// 14. LOGO LOOP / MARQUEE ANIMATION FOR WHY CHOOSE CARDS
function initWhyChooseLoop() {
  const container = document.getElementById('why-choose-loop');
  const track = document.getElementById('why-choose-track');
  const list = document.getElementById('why-choose-list');

  if (!container || !track || !list) return;

  const speed = 65; // speed in px per second
  const smoothTau = 0.25; // deceleration damping factor
  
  let listWidth = list.offsetWidth;
  let containerWidth = container.clientWidth;
  
  function setupCopies() {
    listWidth = list.offsetWidth;
    containerWidth = container.clientWidth;
    if (listWidth === 0) return;

    // Clear existing copies
    const existingLists = Array.from(track.querySelectorAll('.logoloop__list'));
    existingLists.forEach((el, idx) => {
      if (idx > 0) el.remove();
    });

    // Calculate copy count matching container size + padding headroom
    const copiesNeeded = Math.ceil(containerWidth / listWidth) + 2;
    const finalCopies = Math.max(2, copiesNeeded);

    // Clone list nodes
    for (let i = 1; i < finalCopies; i++) {
      const clone = list.cloneNode(true);
      clone.removeAttribute('id');
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
  }

  let isHovered = false;
  
  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  container.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  window.addEventListener('resize', () => {
    setupCopies();
    listWidth = list.offsetWidth;
    containerWidth = container.clientWidth;
  });

  // Calculate widths after a slight delay to ensure browser paints first
  setTimeout(() => {
    setupCopies();
  }, 100);

  let lastTimestamp = null;
  let offset = 0;
  let velocity = speed;
  let rAF = null;

  function animate(timestamp) {
    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }
    const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    const targetVelocity = isHovered ? 0 : speed;

    // Deceleration easing formula
    const easingFactor = 1 - Math.exp(-deltaTime / smoothTau);
    velocity += (targetVelocity - velocity) * easingFactor;

    if (listWidth > 0) {
      offset = offset + velocity * deltaTime;
      offset = ((offset % listWidth) + listWidth) % listWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    rAF = requestAnimationFrame(animate);
  }

  rAF = requestAnimationFrame(animate);
}

// 15. DYNAMIC SCROLL STACK ANIMATION FOR ABOUT US SECTION
function initScrollStack() {
  const scroller = document.getElementById('about-scroll-stack');
  const indicator = document.querySelector('.scroll-stack-indicator');
  if (!scroller) return;

  const cards = scroller.querySelectorAll('.scroll-stack-card');
  const endElement = scroller.querySelector('.scroll-stack-end');
  
  const itemDistance = 100;
  const itemScale = 0.03;
  const itemStackDistance = 30;
  const stackPosition = '20%';
  const scaleEndPosition = '10%';
  const baseScale = 0.85;
  const rotationAmount = 2.5; // slight rotation for a premium look
  const blurAmount = 2.5; // slight blur for stacking depth
  const useWindowScroll = false;

  // Set initial styles
  cards.forEach((card, i) => {
    if (i < cards.length - 1) {
      card.style.marginBottom = `${itemDistance}px`;
    }
    card.style.willChange = 'transform, filter';
    card.style.transformOrigin = 'top center';
    card.style.backfaceVisibility = 'hidden';
    card.style.transform = 'translateZ(0)';
  });

  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  };

  const parsePercentage = (value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  const getScrollData = () => {
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
      scrollContainer: scroller
    };
  };

  const getElementOffset = (element) => {
    return element.offsetTop;
  };

  const updateCardTransforms = () => {
    if (window.innerWidth <= 768) return; // Bypass transitions on mobile screens
    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // Fade out indicator on scroll
    if (indicator) {
      if (scrollTop > 20) {
        indicator.style.opacity = '0';
        indicator.style.pointerEvents = 'none';
      } else {
        indicator.style.opacity = '1';
      }
    }

    cards.forEach((card, i) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Calculate depth blur
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = getElementOffset(cards[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      const filter = blur > 0 ? `blur(${blur}px)` : '';

      card.style.transform = transform;
      card.style.filter = filter;
    });
  };

  scroller.addEventListener('scroll', updateCardTransforms);
  
  // Initial run
  updateCardTransforms();

  // Handle window resize
  window.addEventListener('resize', updateCardTransforms);
}

// 16. HERO IMAGE SCROLL TRIGGER AUTOMATION
function initHeroScrollAnimation() {
  if (window.innerWidth <= 768) return; // Bypass scroll animation on mobile screens
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Smoothly scale down, rotate, and fade the main cake wrapper as the user scrolls
    gsap.to('.hero-image-floating-wrapper', {
      y: 120,
      scale: 0.78,
      opacity: 0.15,
      rotate: 12,
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Expand, spin faster, and fade out the orbit ring on scroll
    gsap.to('.hero-image-ring', {
      scale: 1.25,
      rotate: 240,
      opacity: 0,
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

// 17. INTERACTIVE CAKE CUSTOMIZER & PRICE CALCULATIONS
function initCakeCustomizer() {
  const form = document.getElementById('cake-customizer-form');
  if (!form) return;

  // Initialize the values on page load
  updateCustomizer();

  // Attach change listeners to text/message inputs too
  const messageInput = document.getElementById('custom-message');
  const instructionsInput = document.getElementById('custom-instructions');
  
  if (messageInput) messageInput.addEventListener('input', updateCustomizer);
  if (instructionsInput) instructionsInput.addEventListener('input', updateCustomizer);
}

function updateToppingsVisuals(topTierElement) {
  if (!topTierElement) return;
  const topFace = topTierElement.querySelector('.tier-top');
  if (!topFace) return;

  // Clear existing topping spans inside the top face
  const existingToppings = topFace.querySelectorAll('.topping-element');
  existingToppings.forEach(el => el.remove());

  const checkedToppings = document.querySelectorAll('.topping-pill input[type="checkbox"]:checked');
  
  checkedToppings.forEach(checkbox => {
    const toppingVal = checkbox.value;
    let icon = '';
    let count = 0;
    
    if (toppingVal.includes('Gold')) {
      icon = '✨';
      count = 8;
    } else if (toppingVal.includes('Strawberry')) {
      icon = '🍓';
      count = 4;
    } else if (toppingVal.includes('Macarons')) {
      icon = '🌸';
      count = 4;
    } else if (toppingVal.includes('Chocolate')) {
      icon = '🍫';
      count = 9;
    }
    
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'topping-element';
      el.textContent = icon;
      
      // Random coordinates distributed on the oval top face
      const angle = Math.random() * Math.PI * 2;
      const radiusX = 15 + Math.random() * 25; // Percentage offset
      const radiusY = 10 + Math.random() * 15;
      
      const left = 50 + Math.cos(angle) * radiusX;
      const topPos = 40 + Math.sin(angle) * radiusY;
      
      el.style.left = `${left}%`;
      el.style.top = `${topPos}%`;
      el.style.animationDelay = `${Math.random() * 2.5}s`;
      el.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(${0.75 + Math.random() * 0.45})`;
      
      topFace.appendChild(el);
    }
  });
}

function updateCustomizer() {
  const form = document.getElementById('cake-customizer-form');
  if (!form) return;

  // 1. Read input values
  const selectedFlavorEl = form.querySelector('input[name="flavor"]:checked');
  const flavor = selectedFlavorEl ? selectedFlavorEl.value : 'Belgian Chocolate Truffle';
  const flavorType = selectedFlavorEl ? selectedFlavorEl.parentElement.getAttribute('data-flavor') : 'chocolate';
  
  const selectedTiersEl = form.querySelector('input[name="tiers"]:checked');
  const tiers = selectedTiersEl ? parseInt(selectedTiersEl.value) : 1;
  
  const weight = parseFloat(document.getElementById('custom-weight').value || 1);
  const preference = document.getElementById('custom-preference').value;
  
  // Update visual state for flavor pills
  const flavorPills = document.querySelectorAll('.flavor-pill');
  flavorPills.forEach(pill => {
    pill.classList.remove('active');
    if (pill.querySelector('input').checked) {
      pill.classList.add('active');
    }
  });

  // Update visual state for tier pills
  const tierPills = document.querySelectorAll('.tier-pill');
  tierPills.forEach(pill => {
    pill.classList.remove('active');
    if (pill.querySelector('input').checked) {
      pill.classList.add('active');
    }
  });

  // 2. Run calculations
  let baseRate = 800; // default Chocolate
  if (flavor.includes('Velvet')) baseRate = 750;
  else if (flavor.includes('Butterscotch')) baseRate = 650;
  else if (flavor.includes('Vanilla')) baseRate = 600;
  else if (flavor.includes('Strawberry')) baseRate = 650;
  else if (flavor.includes('Mango')) baseRate = 700;

  const baseCost = baseRate * weight;
  const tierCost = tiers === 2 ? 500 : (tiers === 3 ? 1000 : 0);
  const prefCost = preference === 'Eggless' ? 100 * weight : 0;
  
  let toppingsCost = 0;
  const checkedToppings = form.querySelectorAll('input[name="toppings"]:checked');
  checkedToppings.forEach(checkbox => {
    toppingsCost += parseInt(checkbox.getAttribute('data-price') || 0);
  });

  const totalCost = baseCost + tierCost + prefCost + toppingsCost;

  // 3. Update Text and Price elements
  const summaryFlavor = document.getElementById('summary-flavor-name');
  if (summaryFlavor) summaryFlavor.textContent = flavor;

  const basePriceEl = document.getElementById('summary-base-price');
  if (basePriceEl) basePriceEl.textContent = `₹${baseCost}`;

  const tierPriceEl = document.getElementById('summary-tier-price');
  if (tierPriceEl) tierPriceEl.textContent = `₹${tierCost}`;

  const prefPriceEl = document.getElementById('summary-pref-price');
  if (prefPriceEl) prefPriceEl.textContent = `₹${prefCost}`;

  const toppingsPriceEl = document.getElementById('summary-toppings-price');
  if (toppingsPriceEl) toppingsPriceEl.textContent = `₹${toppingsCost}`;

  const totalEl = document.getElementById('customizer-total-price');
  if (totalEl) totalEl.textContent = `₹${totalCost}`;

  // 4. Handle stacked 3D cylinder active states
  const tier1 = document.getElementById('preview-tier-1');
  const tier2 = document.getElementById('preview-tier-2');
  const tier3 = document.getElementById('preview-tier-3');

  const tiersList = [tier1, tier2, tier3];
  tiersList.forEach(t => {
    if (!t) return;
    // Strip flavor classes
    t.className = 'cake-tier';
  });

  if (tier1) {
    tier1.classList.add('active', 'tier-1', `flavor-${flavorType}`);
  }
  
  if (tier2) {
    if (tiers >= 2) {
      tier2.classList.add('active', 'tier-2', `flavor-${flavorType}`);
    } else {
      tier2.classList.add('tier-2');
    }
  }
  
  if (tier3) {
    if (tiers === 3) {
      tier3.classList.add('active', 'tier-3', `flavor-${flavorType}`);
    } else {
      tier3.classList.add('tier-3');
    }
  }

  // 5. Weight scale formatting
  const assembly = document.getElementById('cake-visual-assembly');
  if (assembly) {
    assembly.className = 'cake-visual-assembly';
    if (weight === 1) assembly.classList.add('weight-1');
    else if (weight === 1.5) assembly.classList.add('weight-1_5');
    else if (weight === 2) assembly.classList.add('weight-2');
    else if (weight === 3) assembly.classList.add('weight-3');
    else if (weight === 5) assembly.classList.add('weight-5');
  }

  // 6. Update Stats bubbles text
  const statWeight = document.getElementById('preview-stat-weight');
  if (statWeight) statWeight.textContent = `${weight} kg`;
  
  const statServings = document.getElementById('preview-stat-servings');
  if (statServings) {
    let servesText = '8-10 Pax';
    if (weight === 1.5) servesText = '12-15 Pax';
    else if (weight === 2) servesText = '16-20 Pax';
    else if (weight === 3) servesText = '24-30 Pax';
    else if (weight === 5) servesText = '40-50 Pax';
    statServings.textContent = servesText;
  }

  const statTiers = document.getElementById('preview-stat-tiers');
  if (statTiers) statTiers.textContent = `${tiers} Tier${tiers > 1 ? 's' : ''}`;

  // 7. Update Toppings visual position on top face of highest active tier
  const activeTiers = document.querySelectorAll('.cake-tier.active');
  if (activeTiers.length > 0) {
    const topTier = activeTiers[activeTiers.length - 1];
    updateToppingsVisuals(topTier);
  }
}

function handleCustomizerSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('cake-customizer-form');
  if (!form) return;

  const flavor = form.querySelector('input[name="flavor"]:checked').value;
  const tiers = form.querySelector('input[name="tiers"]:checked').value;
  const weight = document.getElementById('custom-weight').value;
  const preference = document.getElementById('custom-preference').value;
  
  const toppingsList = [];
  const checkedToppings = form.querySelectorAll('input[name="toppings"]:checked');
  checkedToppings.forEach(cb => toppingsList.push(cb.value));
  const toppingsStr = toppingsList.length > 0 ? toppingsList.join(', ') : 'None';
  
  const message = document.getElementById('custom-message').value || 'None';
  const instructions = document.getElementById('custom-instructions').value || 'None';
  const customerName = document.getElementById('custom-customer-name').value;
  const customerPhone = document.getElementById('custom-customer-phone').value;
  const totalPrice = document.getElementById('customizer-total-price').textContent;

  const phone = '919644553363';
  
  const textMsg = `*The Heaven Cake - Custom Cake Order Request*%0A%0A` +
                  `👤 *Customer Name:* ${customerName}%0A` +
                  `📞 *Contact Phone:* ${customerPhone}%0A%0A` +
                  `🍰 *Cake Specifications:*%0A` +
                  `- *Base Flavor:* ${flavor}%0A` +
                  `- *Tiers:* ${tiers} Tier(s)%0A` +
                  `- *Weight:* ${weight} kg%0A` +
                  `- *Dietary Pref:* ${preference}%0A` +
                  `- *Luxury Toppings:* ${toppingsStr}%0A` +
                  `- *Writing on Cake:* "${message}"%0A%0A` +
                  `📝 *Instructions:* ${instructions}%0A%0A` +
                  `💰 *Estimated Price:* ${totalPrice}%0A%0A` +
                  `Please confirm my custom order reservation. Thank you!`;

  const whatsappUrl = `https://wa.me/${phone}?text=${textMsg}`;
  window.open(whatsappUrl, '_blank');
}

// 18. LIVE ACTIVITY TOAST NOTIFICATION SYSTEM
function initActivityToasts() {
  const toastContainer = document.getElementById('live-activity-toast');
  if (!toastContainer) return;

  const names = ['Aysha', 'Fatima', 'Priya Nair', 'Deekshith', 'Muhammed', 'Anjali', 'Shruthi', 'Rahul', 'Zainaba', 'Karthik', 'Mariyam', 'Siddharth'];
  const locations = ['Kumbla Town', 'Shiriya', 'Mogral', 'Uppala', 'Kasaragod', 'Badiadka', 'Kanwatheera', 'Naikapu', 'Kumble Bridge', 'Koipady'];
  const cakes = [
    { name: 'Heavenly Red Velvet Cake', price: '₹699' },
    { name: 'Belgian Chocolate Truffle', price: '₹799' },
    { name: 'Classic Black Forest Cake', price: '₹599' },
    { name: 'Premium Butterscotch Cake', price: '₹649' },
    { name: 'Bespoke 2-Tier Wedding Cake', price: '₹2200' },
    { name: 'Gourmet Cupcakes Box', price: '₹350' },
    { name: 'Mango Royale Pastry', price: '₹120' }
  ];
  
  const times = ['just now', '2 mins ago', '5 mins ago', '10 mins ago', '15 mins ago'];

  function showRandomToast() {
    if (toastContainer.querySelector('.activity-toast')) return;

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const randomCake = cakes[Math.floor(Math.random() * cakes.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];

    const toast = document.createElement('div');
    toast.className = 'activity-toast';
    
    toast.innerHTML = `
      <div class="toast-avatar">
        <i data-lucide="shopping-bag" style="width: 20px; height: 20px;"></i>
      </div>
      <div class="toast-content">
        <p class="toast-message"><strong>${randomName}</strong> from ${randomLoc} ordered <strong>${randomCake.name}</strong> (${randomCake.price})</p>
        <div class="toast-meta">
          <span class="toast-time">${randomTime}</span>
          <a href="#featured" class="toast-action">View Menu <i data-lucide="chevron-right" style="width: 12px; height: 12px; display: inline;"></i></a>
        </div>
      </div>
      <button class="toast-close" aria-label="Close Notification">
        <i data-lucide="x" style="width: 14px; height: 14px;"></i>
      </button>
    `;

    toastContainer.appendChild(toast);
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: {
          class: 'lucide'
        },
        nameAttr: 'data-lucide',
        node: toast
      });
    }

    setTimeout(() => {
      toast.classList.add('active');
    }, 100);

    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.remove('active');
        setTimeout(() => {
          toast.remove();
        }, 500);
      });
    }

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove('active');
        setTimeout(() => {
          toast.remove();
        }, 500);
      }
    }, 6000);
  }

  // Trigger first toast after 8 seconds
  setTimeout(showRandomToast, 8000);

  // Set interval to check and show every 22 seconds
  setInterval(showRandomToast, 22000);
}

// Bind handlers to window for inline calls
window.updateCustomizer = updateCustomizer;
window.handleCustomizerSubmit = handleCustomizerSubmit;

// 19. ADMIN LOGIN & CATALOG MANAGEMENT SYSTEM
// Safe storage wrapper to prevent SecurityErrors in iframes or sandboxed environments
const safeStorage = {
  _local: {},
  _session: {},
  getItem(key, isSession = false) {
    try {
      const storage = isSession ? window.sessionStorage : window.localStorage;
      return storage.getItem(key);
    } catch (e) {
      console.warn(`Storage read blocked for key "${key}". Using in-memory fallback.`, e);
      const fallback = isSession ? this._session : this._local;
      return fallback[key] !== undefined ? fallback[key] : null;
    }
  },
  setItem(key, value, isSession = false) {
    try {
      const storage = isSession ? window.sessionStorage : window.localStorage;
      storage.setItem(key, value);
    } catch (e) {
      console.warn(`Storage write blocked for key "${key}". Using in-memory fallback.`, e);
      const fallback = isSession ? this._session : this._local;
      fallback[key] = String(value);
    }
  },
  removeItem(key, isSession = false) {
    try {
      const storage = isSession ? window.sessionStorage : window.localStorage;
      storage.removeItem(key);
    } catch (e) {
      console.warn(`Storage remove blocked for key "${key}". Using in-memory fallback.`, e);
      const fallback = isSession ? this._session : this._local;
      delete fallback[key];
    }
  }
};

let tempImageBase64 = '';
let editProductIndex = -1;

function initAdminSystem() {
  const catalogKey = 'theheavencakes_catalog';
  let catalog = safeStorage.getItem(catalogKey);

  // Parse public storefront cards on first load if localStorage is empty
  if (!catalog) {
    const productCards = document.querySelectorAll('.product-card');
    const initialItems = [];

    try {
      productCards.forEach(card => {
        const name = card.getAttribute('data-name') || 'Signature Cake';
        const category = card.getAttribute('data-category') || 'Premium Exotic';
        
        const descEl = card.querySelector('.product-desc');
        const desc = descEl ? descEl.textContent.trim() : 'Delicious cake crafted with premium ingredients.';
        
        const priceEl = card.querySelector('.price-value');
        const price = priceEl ? priceEl.textContent.replace('₹', '').trim() : '999';
        
        const imgEl = card.querySelector('.product-img-wrapper img');
        let img = imgEl ? (imgEl.getAttribute('src') || '') : 'images/hero_chocolate.jpg';
        
        const imgRelative = img.includes('images/') ? 'images/' + img.split('images/')[1] : img;

        initialItems.push({
          name,
          category,
          desc,
          price,
          img: imgRelative
        });
      });

      if (initialItems.length > 0) {
        safeStorage.setItem(catalogKey, JSON.stringify(initialItems));
      }
    } catch (err) {
      console.error("Error seeding storefront catalog cards:", err);
      const fallbackItems = [
        { name: "Belgian Chocolate Truffle", category: "Premium Choco", price: "1000", desc: "Rich, moist dark chocolate sponge layers smothered in luxury Belgian chocolate ganache.", img: "images/hero_chocolate.jpg" },
        { name: "Heavenly Red Velvet", category: "Premium Exotic", price: "1100", desc: "Indulgent layers of classic red velvet sponge, infused with authentic cream cheese frosting.", img: "images/prod_red_velvet.jpg" },
        { name: "Lotus Biscoff Cheesecake", category: "Cheese Cakes", price: "1100", desc: "Silky smooth New York style cheesecake topped with premium Lotus Biscoff spread and cookie crumbs.", img: "images/cat_photo.jpg" }
      ];
      safeStorage.setItem(catalogKey, JSON.stringify(fallbackItems));
    }
  }

  renderCatalog();
}

function renderCatalog() {
  const catalogKey = 'theheavencakes_catalog';
  const catalogJson = safeStorage.getItem(catalogKey);
  if (!catalogJson) return;

  try {
    const catalog = JSON.parse(catalogJson);

    // Populate public storefront products grid
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
      productsGrid.innerHTML = '';
      
      catalog.forEach((item, index) => {
        const card = document.createElement('article');
        const delayClass = index % 4 === 0 ? '' : ` delay-${index % 4}`;
        card.className = `product-card reveal reveal-up${delayClass}`;
        card.setAttribute('data-category', item.category || 'Premium Exotic');
        card.setAttribute('data-name', item.name || 'Signature Cake');

        card.innerHTML = `
          <div class="product-img-wrapper">
            <img src="${item.img || 'images/hero_chocolate.jpg'}" alt="${item.name || 'Cake'} image">
            ${(item.name && (item.name.toLowerCase().includes('biscoff') || item.name.toLowerCase().includes('velvet') || item.name.toLowerCase().includes('truffle'))) ? '<span class="product-badge">Premium</span>' : ''}
          </div>
          <div class="product-content">
            <h3 class="product-name">${item.name || 'Signature Cake'}</h3>
            <p class="product-desc">${item.desc || 'Delicious fresh cream cake.'}</p>
            <div class="product-footer">
              <div class="product-price">
                <span class="price-label">Starts from</span>
                <span class="price-value">₹${item.price || '999'}</span>
              </div>
              <button type="button" class="btn btn-primary product-btn-order" onclick="openOrderModal('${(item.name || 'Signature Cake').replace(/'/g, "\\'")}', '₹${item.price || '999'}', '${item.img || 'images/hero_chocolate.jpg'}')">Order Now</button>
            </div>
          </div>
        `;
        productsGrid.appendChild(card);
      });

      // Reinitialize scroll reveal triggers for active nodes
      if (typeof initScrollReveal === 'function') {
        setTimeout(initScrollReveal, 100);
      }
    }

    // Populate Admin Catalog Manager Table list
    const adminTbody = document.getElementById('admin-catalog-tbody');
    if (adminTbody) {
      adminTbody.innerHTML = '';
      
      catalog.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${item.img || 'images/hero_chocolate.jpg'}" alt="${item.name || 'Cake'}" class="catalog-img-thumb"></td>
          <td>
            <span class="catalog-name">${item.name || 'Signature Cake'}</span>
            <span class="catalog-category">${item.category || 'Premium Exotic'}</span>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.desc || ''}</div>
          </td>
          <td><span class="catalog-price">₹${item.price || '999'}</span></td>
          <td>
            <div class="admin-actions-cell">
              <button type="button" class="btn-edit-prod" onclick="handleEditProduct(${index})" title="Edit Product">
                <i data-lucide="edit" style="width: 16px; height: 16px;"></i>
              </button>
              <button type="button" class="btn-delete-prod" onclick="handleDeleteProduct(${index})" title="Delete Product">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
              </button>
            </div>
          </td>
        `;
        adminTbody.appendChild(tr);
      });

      if (typeof lucide !== 'undefined') {
        lucide.createIcons({
          attrs: { class: 'lucide' },
          nameAttr: 'data-lucide',
          node: adminTbody
        });
      }
    }
  } catch (err) {
    console.error("Failed to parse catalog from localStorage:", err);
    safeStorage.removeItem(catalogKey);
    location.reload();
  }
}

// Modal Toggle Hooks
function openAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;

  document.getElementById('admin-username').value = '';
  document.getElementById('admin-password').value = '';
  document.getElementById('login-error-msg').style.display = 'none';

  const isLoggedIn = safeStorage.getItem('admin_logged_in', true) === 'true';
  const loginView = document.getElementById('admin-login-view');
  const dashView = document.getElementById('admin-dashboard-view');
  const title = document.getElementById('admin-title');

  if (isLoggedIn) {
    loginView.style.display = 'none';
    dashView.style.display = 'block';
    title.textContent = 'Admin Control Panel';
  } else {
    loginView.style.display = 'block';
    dashView.style.display = 'none';
    title.textContent = 'Admin Login';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Admin login session validation
function handleAdminLogin(event) {
  event.preventDefault();
  const user = document.getElementById('admin-username').value.trim();
  const pass = document.getElementById('admin-password').value.trim();
  const errorMsg = document.getElementById('login-error-msg');

  if (user === 'theheavencakes' && pass === 'sukeshheaven') {
    safeStorage.setItem('admin_logged_in', 'true', true);
    errorMsg.style.display = 'none';
    
    document.getElementById('admin-login-view').style.display = 'none';
    document.getElementById('admin-dashboard-view').style.display = 'block';
    document.getElementById('admin-title').textContent = 'Admin Control Panel';
  } else {
    errorMsg.style.display = 'block';
  }
}

function handleAdminLogout() {
  safeStorage.removeItem('admin_logged_in', true);
  document.getElementById('admin-login-view').style.display = 'block';
  document.getElementById('admin-dashboard-view').style.display = 'none';
  document.getElementById('admin-title').textContent = 'Admin Login';
}

// Compress uploaded files to tiny base64 jpegs using canvas to respect localstorage storage limits
function handleImageFileSelect(event) {
  const file = event.target.files[0];
  const filenameLabel = document.getElementById('upload-filename');
  const previewContainer = document.getElementById('image-preview-container');
  const previewImg = document.getElementById('admin-image-preview');

  if (!file) {
    tempImageBase64 = '';
    filenameLabel.textContent = 'Click to upload image file';
    previewContainer.style.display = 'none';
    return;
  }

  filenameLabel.textContent = file.name;
  
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 400;
      const MAX_HEIGHT = 400;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      tempImageBase64 = canvas.toDataURL('image/jpeg', 0.75);
      
      previewImg.src = tempImageBase64;
      previewContainer.style.display = 'block';
    };
  };
}

// Database push and deletion operations
function handleAdminAddProduct(event) {
  event.preventDefault();
  
  const name = document.getElementById('admin-prod-name').value.trim();
  const category = document.getElementById('admin-prod-category').value;
  const price = document.getElementById('admin-prod-price').value.replace('₹', '').trim();
  const desc = document.getElementById('admin-prod-desc').value.trim();

  if (!tempImageBase64) {
    alert('Please upload a product photo.');
    return;
  }

  const catalogKey = 'theheavencakes_catalog';
  const catalogJson = safeStorage.getItem(catalogKey);
  const catalog = catalogJson ? JSON.parse(catalogJson) : [];

  if (editProductIndex > -1) {
    catalog[editProductIndex] = {
      name,
      category,
      price,
      desc,
      img: tempImageBase64
    };
    safeStorage.setItem(catalogKey, JSON.stringify(catalog));
    cancelProductEdit();
    alert('Product successfully updated!');
  } else {
    catalog.push({
      name,
      category,
      price,
      desc,
      img: tempImageBase64
    });
    safeStorage.setItem(catalogKey, JSON.stringify(catalog));
    
    document.getElementById('admin-add-product-form').reset();
    document.getElementById('upload-filename').textContent = 'Click to upload image file';
    document.getElementById('image-preview-container').style.display = 'none';
    tempImageBase64 = '';
    alert('Product successfully added to the active menu catalog!');
  }

  renderCatalog();
}

function handleDeleteProduct(index) {
  if (!confirm('Are you sure you want to delete this product from the menu catalog?')) return;

  const catalogKey = 'theheavencakes_catalog';
  const catalogJson = safeStorage.getItem(catalogKey);
  if (!catalogJson) return;

  const catalog = JSON.parse(catalogJson);
  catalog.splice(index, 1);

  safeStorage.setItem(catalogKey, JSON.stringify(catalog));
  renderCatalog();
}

// Bind admin hooks to window scope for inline HTML calls
window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;
window.handleAdminLogin = handleAdminLogin;
window.handleAdminLogout = handleAdminLogout;
window.handleImageFileSelect = handleImageFileSelect;
window.handleAdminAddProduct = handleAdminAddProduct;
window.handleDeleteProduct = handleDeleteProduct;
window.initAdminSystem = initAdminSystem;

function handleEditProduct(index) {
  const catalogKey = 'theheavencakes_catalog';
  const catalogJson = safeStorage.getItem(catalogKey);
  if (!catalogJson) return;

  const catalog = JSON.parse(catalogJson);
  const item = catalog[index];
  if (!item) return;

  editProductIndex = index;

  // Populate form inputs
  document.getElementById('admin-prod-name').value = item.name;
  document.getElementById('admin-prod-category').value = item.category;
  document.getElementById('admin-prod-price').value = item.price;
  document.getElementById('admin-prod-desc').value = item.desc;

  // Setup image preview
  tempImageBase64 = item.img;
  const previewContainer = document.getElementById('image-preview-container');
  const previewImg = document.getElementById('admin-image-preview');
  const filenameLabel = document.getElementById('upload-filename');

  previewImg.src = item.img;
  previewContainer.style.display = 'block';
  filenameLabel.textContent = 'Existing Image Kept';

  // Remove required attribute from file input since we have an existing image
  document.getElementById('admin-prod-image').removeAttribute('required');

  // Toggle edit states in UI
  document.getElementById('admin-form-title').textContent = 'Edit Product';
  document.getElementById('admin-submit-btn').textContent = 'Update Product';
  document.getElementById('admin-cancel-edit-btn').style.display = 'block';
}

function cancelProductEdit() {
  editProductIndex = -1;
  tempImageBase64 = '';

  // Reset form and file inputs
  document.getElementById('admin-add-product-form').reset();
  document.getElementById('admin-prod-image').setAttribute('required', 'required');
  document.getElementById('upload-filename').textContent = 'Click to upload image file';
  document.getElementById('image-preview-container').style.display = 'none';

  // Restore UI states
  document.getElementById('admin-form-title').textContent = 'Add New Product';
  document.getElementById('admin-submit-btn').textContent = 'Add Product to Menu';
  document.getElementById('admin-cancel-edit-btn').style.display = 'none';
}

window.handleEditProduct = handleEditProduct;
window.cancelProductEdit = cancelProductEdit;
