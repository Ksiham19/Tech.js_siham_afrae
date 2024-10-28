// app.ts
import { Book } from './Book'; // This should remain unchanged if Book.ts is correct

const bookForm = document.getElementById('bookForm') as HTMLFormElement;
const bookList = document.getElementById('bookList') as HTMLElement;
const summary = document.getElementById('summary') as HTMLElement;

let books: Book[] = [];

// Load books from server
async function loadBooks() {
    const response = await fetch('/books');
    books = await response.json();
    displayBooks();
}

function displayBooks() {
    bookList.innerHTML = '';
    let totalBooksRead = 0;
    let totalPagesRead = 0;

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'p-4 border mb-2 bg-white rounded';
        bookElement.innerHTML = `
            <h2 class="font-bold">${book.title} by ${book.author}</h2>
            <p>Pages: ${book.numberOfPages}, Read: ${book.pagesRead} (${book.currentlyAt().toFixed(2)}%)</p>
            <p>Status: ${book.status}, Format: ${book.format}, Suggested By: ${book.suggestedBy}</p>
        `;
        bookList.appendChild(bookElement);

        if (book.finished) {
            totalBooksRead++;
            totalPagesRead += book.numberOfPages;
        }
    });

    summary.innerHTML = `<h3>Total Books Read: ${totalBooksRead}</h3>
                         <h3>Total Pages Read: ${totalPagesRead}</h3>`;
}

bookForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const newBook = new Book(
        (document.getElementById('title') as HTMLInputElement).value,
        (document.getElementById('author') as HTMLInputElement).value,
        parseInt((document.getElementById('numberOfPages') as HTMLInputElement).value),
        (document.getElementById('status') as HTMLSelectElement).value,
        parseFloat((document.getElementById('price') as HTMLInputElement).value),
        parseInt((document.getElementById('pagesRead') as HTMLInputElement).value),
        (document.getElementById('format') as HTMLSelectElement).value,
        (document.getElementById('suggestedBy') as HTMLInputElement).value
    );

    books.push(newBook);
    await fetch('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(books)
    });

    displayBooks();
    bookForm.reset();
});

// Load books on page load
loadBooks();
