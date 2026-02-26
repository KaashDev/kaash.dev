// Smooth scroll behavior with nav highlight
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// Update active nav link on scroll
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Cursor spotlight effect
const spotlight = document.querySelector('.cursor-spotlight');

document.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--x', `${e.clientX}px`);
    spotlight.style.setProperty('--y', `${e.clientY}px`);
});

// Fade in sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items and project cards
document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Prevent mobile scrolling issues
let lastScrollTop = 0;
const delta = 5;

window.addEventListener('scroll', () => {
    const st = window.scrollY || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - st) <= delta) return;
    
    lastScrollTop = st;
}, { passive: true });

// Log message for recruiters
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #64ffda;');
console.log('%cThanks for checking out my portfolio. I\'m currently looking for Summer 2026 and 2027 internship opportunities.', 'font-size: 14px; color: #8892b0;');
console.log('%cGitHub: https://github.com/KaashDev', 'font-size: 12px; color: #64ffda;');

// Smooth scroll polyfill for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Track time on page (optional analytics)
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time spent on portfolio: ${timeSpent} seconds`);
});

// Preload images on hover for better UX
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && href.startsWith('http')) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'prefetch';
            preloadLink.href = href;
            document.head.appendChild(preloadLink);
        }
    });
});

// Handle focus for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// Add some CSS for keyboard focus
const style = document.createElement('style');
style.textContent = `
    body:not(.using-keyboard) *:focus {
        outline: none;
    }
    
    body.using-keyboard *:focus {
        outline: 2px solid #64ffda;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);
