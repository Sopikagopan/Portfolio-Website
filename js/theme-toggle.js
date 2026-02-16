/* =========================================
   THEME TOGGLE LOGIC
   ========================================= */

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved user preference, if any, on load of the website
const darkTheme = 'dark';
const iconMoon = 'fa-moon';
const iconSun = 'fa-sun';

// 1. Check local storage
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// 2. Validate if the user previously chose a topic
const getCurrentTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
const getCurrentIcon = () => themeIcon.classList.contains(iconSun) ? iconSun : iconMoon;

if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.documentElement.setAttribute('data-theme', selectedTheme === 'dark' ? 'dark' : 'light');
    themeIcon.classList[selectedIcon === iconSun ? 'add' : 'remove'](iconSun);
    themeIcon.classList[selectedIcon === iconMoon ? 'add' : 'remove'](iconMoon);
} else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove(iconMoon);
        themeIcon.classList.add(iconSun);
    }
}

// 3. Activate / deactivate the theme manually with the button
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);

    // Toggle Icon
    themeIcon.classList.toggle(iconMoon);
    themeIcon.classList.toggle(iconSun);

    // Save to local storage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});
