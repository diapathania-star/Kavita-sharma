// ========================
// Language Toggle Function
// ========================
function toggleLanguage() {
    const body = document.body;
    const currentLang = body.getAttribute('lang') || 'en';
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    body.setAttribute('lang', newLang);

    // Save preference
    localStorage.setItem('preferredLanguage', newLang);
}

// ========================
// DOMContentLoaded: setup
// ========================
window.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        document.body.setAttribute('lang', savedLang);
    }

    // Trigger initial reveal check
    revealOnScroll();
});

// ========================
// Scroll reveal animation
// ========================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add('active');

            // If it's a section header, trigger the line animation
            if (el.classList.contains('section-header')) {
                el.classList.add('active');
            }
        }
    });
};

// Optimized scroll listener with throttling for reveal
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// ========================
// Smooth scroll for nav links
// ========================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // If it's just "#", scroll to top
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ========================
// Mobile menu toggle
// ========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// ========================
// Contact form submission
// ========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const currentLang = document.body.getAttribute('lang') || 'en';
        const message = currentLang === 'hi'
            ? 'आपके संदेश के लिए धन्यवाद! कविता जी जल्द ही आपसे संपर्क करेंगी।'
            : 'Thank you for your message! Kavita will get back to you soon.';

        alert(message);
        this.reset();

        // TODO: connect with backend endpoint if needed
        // fetch('/api/contact', { method: 'POST', body: new FormData(this) })
    });
}

// ========================
// Gallery lightbox
// ========================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('img');

        // Skip placeholder SVGs
        if (!img || img.src.includes('data:image/svg')) return;

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close" aria-label="Close image">&times;</button>
            </div>
        `;

        // Wrapper style
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(26, 22, 18, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeInUp 0.3s ease-out;
        `;

        const content = lightbox.querySelector('.lightbox-content');
        if (content) {
            content.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
        }

        const lightboxImg = lightbox.querySelector('img');
        if (lightboxImg) {
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
                border: 4px solid var(--paper);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            `;
        }

        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: var(--paper);
                font-size: 3rem;
                cursor: pointer;
                line-height: 1;
                padding: 0.5rem;
            `;
        }

        document.body.appendChild(lightbox);

        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.25s ease-out';
            setTimeout(() => lightbox.remove(), 250);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// ========================
// Inject fadeOut keyframes
// ========================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========================
// Parallax effect on hero image (subtle)
// ========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const artFrame = document.querySelector('.art-frame');

    if (artFrame && scrolled < window.innerHeight * 1.5) {
        const offset = scrolled * 0.2; // subtle
        artFrame.style.transform = `translateY(${offset}px)`;
    }
});

// ========================
// Performance: Lazy load
// ========================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('🎨 Kavita Sharma - Hand Drawn Memories | Script loaded successfully');