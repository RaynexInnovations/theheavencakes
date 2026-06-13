/**
 * THE HEAVEN CAKE - Premium Web Application Interaction Engine
 * Features: Apple-inspired micro-interactions, scroll reveals, lazy features, WhatsApp automation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initLoader();
  initScrollEffects();
  initMobileNav();
  initScrollReveal();
  initStatsCounter();
  initTestimonialsSlider();
  initFaqAccordion();
  initMouseParallax();
  initParticles();
  initSplitTextAnimation();
  initWhyChooseLoop();
  initScrollStack();
  initHeroScrollAnimation();
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
