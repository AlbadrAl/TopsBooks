// bookshelf.js
import { bookshelfList, searchInput } from './domElements.js';
import { renderBookshelf, showBookDetails } from './render.js';
import { searchBooks } from './search.js';

export let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];

export function addToBookshelf(book) {
    if (!bookshelf.some(b => b.key === book.key)) {
        bookshelf.push(book);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        renderBookshelf();
        searchBooks();
    }
}

export function removeFromBookshelf(bookKey) {
    bookshelf = bookshelf.filter(book => book.key !== bookKey);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    renderBookshelf();
    if (searchInput.value.trim()) searchBooks();
}
