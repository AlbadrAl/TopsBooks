// search.js
import { searchInput, searchResults } from './domElements.js';
import { createBookCard } from './render.js';

export function searchBooks() {
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a search term');
        return;
    }

    searchResults.innerHTML = '<div class="loading">Searching for books...</div>';

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            if (!data.docs || data.docs.length === 0) {
                searchResults.innerHTML = '<div class="no-results">No books found. Try a different search.</div>';
                return;
            }
            searchResults.innerHTML = '';
            data.docs.forEach(book => {
                const bookCard = createBookCard(book);
                searchResults.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            searchResults.innerHTML = '<div class="error">An error occurred. Please try again.</div>';
        });
}
