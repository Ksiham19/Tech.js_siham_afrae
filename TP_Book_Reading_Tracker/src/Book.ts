// Book.ts
export class Book {
    title: string;
    author: string;
    numberOfPages: number;
    status: string;
    price: number;
    pagesRead: number;
    format: string;
    suggestedBy: string;
    finished: boolean;

    constructor(title: string, author: string, numberOfPages: number, status: string, price: number, pagesRead: number, format: string, suggestedBy: string) {
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

    currentlyAt(): number {
        return (this.pagesRead / this.numberOfPages) * 100; // Returns the percentage of pages read
    }

    deleteBook(): void {
        // Implement delete logic (to be handled in the main app)
    }
}
