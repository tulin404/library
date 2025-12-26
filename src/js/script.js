// THEME
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

window.addEventListener('load', checkTheme);

function checkTheme() {
    checkStorage();
    checkThemeIcons();
};

function checkThemeIcons() {
    if (localStorage.getItem('theme') === 'dark' || isBrowserDark() && localStorage.getItem('theme') === null) {
        sun.classList.add('opacity-0', 'z-10', 'pointer-events-none');
        moon.classList.remove('opacity-0', 'z-10', 'pointer-events-none');
    } else if (localStorage.getItem('theme') === 'light' || !isBrowserDark() && localStorage.getItem('theme') === null) {
        moon.classList.add('opacity-0', 'z-10', 'pointer-events-none');
        sun.classList.remove('opacity-0', 'z-10', 'pointer-events-none');
    };
};

function isBrowserDark() {
    return (window.matchMedia('(prefers-color-scheme: dark)').matches)
}

function checkStorage() {
    if (localStorage.getItem('theme') === null) {
        if (isBrowserDark()) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        };
    } else {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        };
    };
};

sun.addEventListener('click', () => {
    localStorage.setItem('theme', 'dark');
    checkTheme();
});
moon.addEventListener('click', () => {
    localStorage.setItem('theme', 'light');
    checkTheme();
});

// ADD BOOK

const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancell-btn');
const bookInput = document.getElementById('book-input-div');

addBtn.addEventListener('click', inputOpenClose);
cancelBtn.addEventListener('click', inputOpenClose);

function inputOpenClose() {
    bookInput.classList.toggle('scale-0');
    document.documentElement.classList.toggle('opacity-bg');
};

// SUBMIT BOOK
const subBtn = document.getElementById('sub-btn');

