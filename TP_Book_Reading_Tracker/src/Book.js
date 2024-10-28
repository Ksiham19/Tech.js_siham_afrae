"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
// Book.ts
class Book {
    constructor(title, author, numberOfPages, status, price, pagesRead, format, suggestedBy) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= numberOfPages;
    }
    currentlyAt() {
        return (this.pagesRead / this.numberOfPages) * 100; // Returns the percentage of pages read
    }
    deleteBook() {
        // Implement delete logic (to be handled in the main app)
    }
}
exports.Book = Book;
