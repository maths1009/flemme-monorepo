// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initFAQ();
  initNewsletterForm();
  initSmoothScrolling();
  initAccessibility();
  initPerformanceOptimizations();
});

// FAQ Accordion Functionality
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((question) => {
    question.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answerId = this.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Close all other FAQ items
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== this) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          const otherAnswerId = otherQuestion.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherAnswerId);
          if (otherAnswer) {
            otherAnswer.hidden = true;
          }
        }
      });

      // Toggle current FAQ item
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        this.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });

    // Handle keyboard navigation
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Newsletter Form Functionality
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('email-error');

  if (!form || !emailInput || !errorMessage) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Reset previous error state
    clearError();

    // Validate email
    if (!email) {
      showError('Veuillez saisir votre adresse email.');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Veuillez saisir une adresse email valide.');
      return;
    }

    // Simulate form submission
    submitNewsletter(email);
  });

  // Real-time validation
  emailInput.addEventListener('blur', function () {
    const email = this.value.trim();
    if (email && !isValidEmail(email)) {
      showError('Veuillez saisir une adresse email valide.');
    } else {
      clearError();
    }
  });

  emailInput.addEventListener('input', function () {
    if (errorMessage.classList.contains('show')) {
      clearError();
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    emailInput.setAttribute('aria-invalid', 'true');
    emailInput.setAttribute('aria-describedby', 'email-error');
  }

  function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
    emailInput.removeAttribute('aria-invalid');
  }

  function submitNewsletter(email) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'INSCRIPTION...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Success state
      submitButton.textContent = 'INSCRIT !';
      submitButton.style.background = '#10b981';
      emailInput.value = '';

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent =
        'Merci ! Vous êtes maintenant inscrit à notre newsletter.';
      successMessage.style.cssText = `
                color: #10b981;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                text-align: center;
            `;
      form.appendChild(successMessage);

      // Reset after 3 seconds
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';
        if (successMessage.parentNode) {
          successMessage.remove();
        }
      }, 3000);
    }, 1500);
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update focus for accessibility
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

// Accessibility Enhancements
function initAccessibility() {
  // Add focus indicators for keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
  });

  // Announce page changes to screen readers
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'aria-expanded'
      ) {
        const element = mutation.target;
        const isExpanded = element.getAttribute('aria-expanded') === 'true';

        // Announce state change
        if (isExpanded) {
          announceToScreenReader('Section développée');
        } else {
          announceToScreenReader('Section réduite');
        }
      }
    });
  });

  // Observe FAQ questions for aria-expanded changes
  document.querySelectorAll('.faq-question').forEach((question) => {
    observer.observe(question, { attributes: true });
  });

  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Performance Optimizations
function initPerformanceOptimizations() {
  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Preload critical resources
  const criticalImages = ['/la-flemme--.svg', '/rectangle-29-1.svg'];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Debounced scroll handler for performance
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(function () {
      handleScroll();
    }, 16); // ~60fps
  });

  function handleScroll() {
    const scrollY = window.scrollY;
    const header = document.querySelector('.header');

    // Add/remove header shadow based on scroll position
    if (scrollY > 10) {
      header.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    }
  }
}

// Error Handling
window.addEventListener('error', function (e) {
  console.error('JavaScript Error:', e.error);

  // Don't show errors to users in production
  if (window.location.hostname !== 'localhost') {
    return;
  }

  // Show user-friendly error message in development
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 9999;
        max-width: 300px;
        font-size: 0.875rem;
    `;
  errorDiv.textContent =
    'Une erreur est survenue. Veuillez rafraîchir la page.';

  document.body.appendChild(errorDiv);

  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed');
      });
  });
}
