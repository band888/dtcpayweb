/**
 * dtcpay Website - Modern JavaScript
 * With animations, interactions, and SEO enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize page loader first
  initPageLoader();
  
  // Initialize all modules
  initSlider();
  initScrollAnimations();
  initHeader();
  initMobileMenu();
  initTestimonialSlider();
  initScrollToTop();
  initNotificationBar();
  initSmoothScroll();
  initLazyLoading();
  initCursorGlow();
  initTiltEffect();
});

/**
 * Page Loader
 */
function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  
  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  });
  
  // Fallback: hide loader after 3 seconds max
  setTimeout(() => {
    if (!loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 3000);
}

/**
 * Cursor Glow Effect (Desktop only)
 */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow || window.matchMedia('(hover: none)').matches) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    // Smooth follow with easing
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

/**
 * 3D Tilt Effect for Cards
 */
function initTiltEffect() {
  const cards = document.querySelectorAll('.product-card, .feature-card');
  
  if (window.matchMedia('(hover: none)').matches) return;
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/**
 * Hero Slider
 */
function initSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.slider-dot');
  const prevBtn = slider.querySelector('.slider-arrow.prev');
  const nextBtn = slider.querySelector('.slider-arrow.next');
  
  let currentSlide = 0;
  let autoplayInterval;
  const autoplayDelay = 5000;

  function showSlide(index) {
    // Handle index wrapping
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Start autoplay
  startAutoplay();
}

/**
 * Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * Header Scroll Effects
 */
function initHeader() {
  const header = document.querySelector('.header');
  const notificationBar = document.querySelector('.notification-bar');
  let lastScroll = 0;
  let notificationHeight = notificationBar ? notificationBar.offsetHeight : 0;

  function updateHeader() {
    const currentScroll = window.pageYOffset;
    
    // Update header position based on notification bar
    if (notificationBar && !notificationBar.classList.contains('hidden')) {
      if (currentScroll > notificationHeight) {
        header.style.top = '0';
      } else {
        header.style.top = (notificationHeight - currentScroll) + 'px';
      }
    }

    // Add shadow on scroll
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', throttle(updateHeader, 16));
  updateHeader();
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!menuBtn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Mobile dropdown toggles
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    const link = item.querySelector('.mobile-nav-link');
    const dropdown = item.querySelector('.mobile-dropdown');
    
    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('open');
        dropdown.style.maxHeight = item.classList.contains('open') 
          ? dropdown.scrollHeight + 'px' 
          : '0';
      });
    }
  });
}

/**
 * Testimonial Auto-Scroll Slider
 */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  // Clone items for infinite scroll
  const items = track.querySelectorAll('.testimonial-card');
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-top');
  if (!scrollBtn) return;

  function toggleScrollButton() {
    if (window.pageYOffset > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', throttle(toggleScrollButton, 100));

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Notification Bar
 */
function initNotificationBar() {
  const notification = document.querySelector('.notification-bar');
  const closeBtn = notification?.querySelector('.notification-close');
  
  if (!notification || !closeBtn) return;

  // Check if already dismissed
  if (sessionStorage.getItem('notification-dismissed')) {
    notification.classList.add('hidden');
    return;
  }

  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateY(-100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      notification.classList.add('hidden');
      sessionStorage.setItem('notification-dismissed', 'true');
      
      // Update header position
      const header = document.querySelector('.header');
      if (header) header.style.top = '0';
    }, 300);
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback: load all images immediately
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    });
  }
}

/**
 * Utility Functions
 */
function throttle(func, wait) {
  let timeout = null;
  let previous = 0;
  
  return function(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * Newsletter Form
 */
document.addEventListener('submit', function(e) {
  if (e.target.classList.contains('newsletter-form')) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.newsletter-btn');
    
    if (input && input.value) {
      btn.textContent = 'Subscribing...';
      btn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        btn.textContent = 'Subscribed!';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
        }, 2000);
      }, 1000);
    }
  }
});

/**
 * Dropdown Menu Keyboard Navigation
 */
document.querySelectorAll('.nav-item').forEach(item => {
  const link = item.querySelector('.nav-link');
  const dropdown = item.querySelector('.dropdown');
  
  if (link && dropdown) {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdown.classList.toggle('show');
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }
});

/**
 * Product Card Tabs (if present)
 */
function initProductTabs() {
  const tabBtns = document.querySelectorAll('.product-tab-btn');
  const tabPanels = document.querySelectorAll('.product-tab-panel');
  
  if (!tabBtns.length) return;
  
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      
      // Add active to clicked
      btn.classList.add('active');
      tabPanels[index]?.classList.add('active');
    });
  });
}

// Initialize product tabs
initProductTabs();

/**
 * Counter Animation
 */
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Initialize counters when visible
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * Parallax Effect
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', throttle(() => {
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, 16));
}

initParallax();

/**
 * Enhanced Scroll Animations with Stagger
 */
function initEnhancedAnimations() {
  // Add stagger delays to grid items
  const grids = [
    { selector: '.products-grid .product-card', delay: 100 },
    { selector: '.features-grid .feature-card', delay: 100 },
    { selector: '.why-grid .why-card', delay: 100 },
    { selector: '.case-studies-grid .case-study-card', delay: 100 }
  ];
  
  grids.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      item.style.transitionDelay = `${index * delay}ms`;
    });
  });
}

// Initialize enhanced animations
initEnhancedAnimations();

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .cta-btn, .slide-btn');
  
  if (window.matchMedia('(hover: none)').matches) return;
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

initMagneticButtons();

/**
 * Intersection Observer for Section Reveals
 */
function initSectionReveals() {
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => sectionObserver.observe(section));
}

initSectionReveals();

console.log('dtcpay website initialized successfully with enhancements');
