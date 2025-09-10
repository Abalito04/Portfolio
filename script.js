// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll - optimized
let ticking = false;
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    ticking = false;
}

// Use passive event listener for better performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .service-card, .section-title');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling with SendGrid
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        const loadingText = currentLanguage === 'es' ? 'Enviando...' : 'Sending...';
        submitBtn.innerHTML = `<span class="loading"></span> ${loadingText}`;
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            language: currentLanguage
        };
        
        try {
            // Send to your backend endpoint
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                const successMessage = currentLanguage === 'es' 
                    ? '¡Mensaje enviado correctamente! Te contactaré pronto.' 
                    : 'Message sent successfully! I will contact you soon.';
                showNotification(successMessage, 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send email');
            }
            
        } catch (error) {
            console.error('Error sending email:', error);
            const errorMessage = currentLanguage === 'es' 
                ? 'Error al enviar el mensaje. Inténtalo de nuevo.' 
                : 'Error sending message. Please try again.';
            showNotification(errorMessage, 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Code typing animation
function typeCode() {
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    
    if (!line1 || !line2) {
        console.log('Elements not found');
        return;
    }
    
    
    // Clear initial content
    line1.innerHTML = '';
    line2.innerHTML = '';
    
    // Define the text to type character by character
    const text1 = 'def crear_solucion():';
    const text2 = '    return "Éxito garantizado"';
    
    let i = 0;
    let j = 0;
    
    function typeLine1() {
        if (i < text1.length) {
            const currentText = text1.substring(0, i + 1);
            
            // Build HTML with styling
            let htmlText = '';
            if (currentText.includes('def')) {
                htmlText = currentText.replace('def', '<span class="code-keyword">def</span>');
            } else {
                htmlText = currentText;
            }
            
            if (currentText.includes('crear_solucion')) {
                htmlText = htmlText.replace('crear_solucion', '<span class="code-function">crear_solucion</span>');
            }
            
            line1.innerHTML = htmlText + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeLine1, 150);
        } else {
            // Start typing line 2 after a pause
            setTimeout(() => {
                line1.innerHTML = '<span class="code-keyword">def</span> <span class="code-function">crear_solucion</span>():<span class="cursor">|</span>';
                setTimeout(typeLine2, 500);
            }, 500);
        }
    }
    
    function typeLine2() {
        if (j < text2.length) {
            const currentText = text2.substring(0, j + 1);
            
            // Build HTML with styling
            let htmlText = '';
            if (currentText.includes('return')) {
                htmlText = currentText.replace('return', '<span class="code-keyword">return</span>');
            } else {
                htmlText = currentText;
            }
            
            if (currentText.includes('"Éxito garantizado"')) {
                htmlText = htmlText.replace('"Éxito garantizado"', '<span class="code-string">"Éxito garantizado"</span>');
            }
            
            line2.innerHTML = htmlText + '<span class="cursor">|</span>';
            j++;
            setTimeout(typeLine2, 150);
        } else {
            // Final state
            line1.innerHTML = '<span class="code-keyword">def</span> <span class="code-function">crear_solucion</span>():';
            line2.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> <span class="code-string">"Éxito garantizado"</span><span class="cursor">|</span>';
        }
    }
    
    // Start typing after a delay
    setTimeout(typeLine1, 1000);
}

// Language toggle functionality
let currentLanguage = 'es';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });
    
    // Update placeholders for form inputs
    document.querySelectorAll('[data-placeholder-es][data-placeholder-en]').forEach(element => {
        element.placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
    });
    
    // Update language button
    const languageBtn = document.getElementById('language-toggle');
    const languageSpan = languageBtn.querySelector('span');
    languageSpan.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    
    // Update page title
    document.title = currentLanguage === 'es' ? 'Matias Abalo - Portfolio' : 'Matias Abalo - Portfolio';
    
    // Store language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Initialize language from localStorage
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== 'es') {
        toggleLanguage();
    }
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    initializeLanguage();
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
    
    // Start code typing animation
    setTimeout(() => {
        typeCode();
    }, 2000);
    
    // Add language toggle event listener
    const languageBtn = document.getElementById('language-toggle');
    if (languageBtn) {
        languageBtn.addEventListener('click', toggleLanguage);
    }
});

// Remove parallax effect that causes dragging
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const rate = scrolled * -0.5;
//         hero.style.transform = `translateY(${rate}px)`;
//     }
// });

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click tracking for project links
document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const projectName = link.closest('.project-card').querySelector('.project-title').textContent;
            const linkType = link.querySelector('.fa-github') ? 'GitHub' : 'Live Demo';
            
            // Track click (you can integrate with analytics here)
            console.log(`Clicked ${linkType} link for project: ${projectName}`);
        });
    });
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.project-card, .service-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add loading animation for images (if any are added later)
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
