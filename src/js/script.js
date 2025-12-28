// THEME
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

window.addEventListener('load', checkTheme);
window.addEventListener('load', createStoredBooks);

function checkTheme() {
    checkStorage();
    checkThemeIcons();
};

function checkThemeIcons() {
    if (localStorage.getItem('theme') === 'dark' || isBrowserDark() && localStorage.getItem('theme') === null) {
        sun.classList.add('theme-img-toggler');
        moon.classList.remove('theme-img-toggler');
    } else if (localStorage.getItem('theme') === 'light' || !isBrowserDark() && localStorage.getItem('theme') === null) {
        sun.classList.remove('theme-img-toggler');
        moon.classList.add('theme-img-toggler');
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
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');

addBtn.addEventListener('click', inputOpenClose);
cancelBtn.addEventListener('click', inputOpenClose);

function inputOpenClose() {
    bookInput.classList.toggle('scale-0');
    document.documentElement.classList.toggle('opacity-bg');
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
};

function isValid(element) {
    if (!element.checkValidity()) {
        element.style.animation = 'invalid 0.3s forwards';
        element.style.border = '2px solid red';
    } else {
        element.style.border = '';
        element.style.animation = '';
    }
};

titleInput.addEventListener('input', () => isValid(titleInput));
authorInput.addEventListener('input', () => isValid(authorInput));
pagesInput.addEventListener('input', () => isValid(pagesInput));

// SUBMIT BOOK
const subBtn = document.getElementById('sub-btn');
const booksGrid = document.getElementById('books-grid');

// DYNAMICALLY UPDATES BOOKSARRAY
function checkBooksArray() {
    if (localStorage.getItem('books') !== null) {
        return (JSON.parse(localStorage.getItem('books')))
    } else {
        return ([]);
    };
};

let booksArray = checkBooksArray();

subBtn.addEventListener('click', subBook);

function subBook() {
    if (checkValidity()) {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    
    const newBook = new Book(title, author, pages);
    updateStorage(newBook);
    createBookDiv(newBook.id, newBook.title, newBook.author, newBook.pages);


    inputOpenClose();
    } else {
        isValid(titleInput);
        isValid(authorInput);
        isValid(pagesInput);
    };
};

// CONSTRUCTOR
function Book(title, author, pages) {
    this.id = booksArray.length + 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
};

// HELPERS FOR THE SUB FUNCTION
function checkValidity() {
    if (titleInput.checkValidity() && authorInput.checkValidity() && pagesInput.checkValidity()) {
        return true;
    } else {
        return false;
    };
};

function updateStorage (element) {
    booksArray.unshift(element);
    localStorage.setItem('books', JSON.stringify(booksArray));
};

function createBookDiv(id, title, author, pages) {
    const booksGrid = document.getElementById('books-grid');

    const bookWrapper = document.createElement('div');
    bookWrapper.classList.add('book-wrapper', 'flex', 'flex-col', 'text-center', 'rounded-md', 'px-6', 'py-4', 'bg-primary', 'shadow-md', 'gap-4');
    bookWrapper.dataset.id = id;
    booksGrid.prepend(bookWrapper);
    bookWrapper.innerHTML = `
    <div id="info-wrapper" class="text-primary-font">
        <div id="book-title" class="font-semibold text-2xl">${title}</div>
        <div id="book-author">${author}</div>
        <div id="book-pages" class="text-[15px]">${pages}</div>
    </div>
    <div id="btns-wrapper" class="text-xl flex flex-col items-center gap-2">
            <button id="read-btn" class="w-[80%] bg-green-400 text-green-100 py-0.5 rounded-md">
                Read
            </button>
            <button id="remove-btn" class="w-[80%] bg-red-400 text-red-100 py-0.5 rounded-md">
                Remove
            </button>
    </div>`
};

// CREATE STORED BOOKS (window load)
function createStoredBooks() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    storedBooks.forEach(book => {
        createBookDiv(book.title, book.author, book.pages);
    });
};