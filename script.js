/* =========================================
   2026 ULTRA-PREMIUM SCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTyping();
    initScrollEffects();
});

/* --- THEME LOGIC --- */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
}

function updateIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* --- TYPING ANIMATION --- */
function initTyping() {
    const text = "Hi, I'm Sopika Gopan — Aspiring AI Engineer";
    const target = document.querySelector('.typing-text');
    let idx = 0;

    function typeChar() {
        if (idx < text.length) {
            target.textContent += text.charAt(idx);
            idx++;
            setTimeout(typeChar, 80);
        }
    }
    typeChar();
}

/* --- SCROLL EFFECTS (REVEAL & TIMELINE) --- */
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                // Trigger Skill Bars
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }

                // Trigger Timeline Growth
                if (entry.target.classList.contains('timeline')) {
                    entry.target.classList.add('scrolled');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .skills, .timeline').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0, 0, 1)";
        revealObserver.observe(el);
    });
}

/* --- PROJECT FILTERING --- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

/* --- FORM VALIDATION --- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        btn.textContent = "TRANSMITTING...";

        setTimeout(() => {
            btn.textContent = "SIGNAL RECEIVED ✓";
            btn.style.background = "#10b981";
            contactForm.reset();
        }, 1500);
    });
}
