const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

checkThemeIcons();

function checkThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        sun.classList.add('opacity-0', 'z-10', 'pointer-events-none');
        moon.classList.remove('opacity-0', 'z-10', 'pointer-events-none');
    } else {
        moon.classList.add('opacity-0', 'z-10', 'pointer-events-none');
        sun.classList.remove('opacity-0', 'z-10', 'pointer-events-none');
    };
}

sun.addEventListener('click', () => {
    document.documentElement.classList.add('dark');
    checkThemeIcons();
});

moon.addEventListener('click', () => {
    document.documentElement.classList.remove('dark');
    checkThemeIcons();
});

