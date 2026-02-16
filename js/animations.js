/* =========================================
   ANIMATIONS LOGIC
   ========================================= */

/* --- TYPING EFFECT --- */
const typingText = document.querySelector('.typing-text');
const roles = ['AI Engineer', 'ML Enthusiast', 'NLP Practitioner', 'Data Scientist'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

/* --- SCROLL REVEAL --- */
const scrollElements = document.querySelectorAll('.reveal-on-scroll');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('is-visible');
};

const hideScrollElement = (element) => {
    // Optional: Only hide if you want them to re-animate when scrolling back up
    // element.classList.remove('is-visible'); 
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.15)) { // 1.15 = trigger slightly before bottom
            displayScrollElement(el);

            // Trigger progress bars if child of reveal element
            if (el.classList.contains('skills-grid') || el.closest('.skills-grid')) {
                animateProgressBars();
            }
        } else if (elementOutofView(el)) {
            hideScrollElement(el)
        }
    })
}

/* --- PROGRESS BARS --- */
let progressAnimated = false;
function animateProgressBars() {
    if (progressAnimated) return;

    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
    progressAnimated = true;
}


// Init
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    handleScrollAnimation(); // Check on load

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
