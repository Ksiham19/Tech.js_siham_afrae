"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Book class
const Book_1 = require("../Book"); 

// Selecting DOM elements
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const summary = document.getElementById('summary');
let books = [];

// Load books from server on page load
function loadBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/books');
        books = yield response.json();
        displayBooks();
    });
}

// Function to display books in the DOM
function displayBooks() {
    bookList.innerHTML = ''; // Clear the current book list
    let totalBooksRead = 0;
    let totalPagesRead = 0;

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'p-4 border mb-2 bg-white rounded';
        
        // Calculate reading percentage
        const readingPercentage = ((book.pagesRead / book.numberOfPages) * 100).toFixed(2);

        // Populate book details
        bookElement.innerHTML = `
            <h2 class="font-bold">${book.title} by ${book.author}</h2>
            <p>Pages: ${book.numberOfPages}, Read: ${book.pagesRead} (${readingPercentage}%)</p>
            <p>Status: ${book.status}, Format: ${book.format}, Suggested By: ${book.suggestedBy}</p>
        `;
        
        bookList.appendChild(bookElement); // Add the book to the list

        // Update totals if the book is finished
        if (book.finished) {
            totalBooksRead++;
            totalPagesRead += book.numberOfPages;
        }
    });

    // Update summary information
    summary.innerHTML = `<h3>Total Books Read: ${totalBooksRead}</h3>
                         <h3>Total Pages Read: ${totalPagesRead}</h3>`;
}

// Form submission handling
bookForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); // Prevent form submission

    // Create a new book instance
    const newBook = new Book_1.Book(
        document.getElementById('title').value,
        document.getElementById('author').value,
        parseInt(document.getElementById('numberOfPages').value),
        document.getElementById('status').value,
        parseFloat(document.getElementById('price').value),
        parseInt(document.getElementById('pagesRead').value),
        document.getElementById('format').value,
        document.getElementById('suggestedBy').value
    );

    // Add the new book to the books array
    books.push(newBook);

    // Send the new book data to the server
    yield fetch('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook) // Send the new book object, not the entire books array
    });

    displayBooks(); // Refresh the book display
    bookForm.reset(); // Reset the form fields
}));

// Load books on page load
loadBooks();
