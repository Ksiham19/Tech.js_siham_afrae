import { Component } from '@angular/core';
import { Book } from '../shared/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  books: Book[] = [
    
  ];

  // Vérifie si la liste est vide
  get isBooksEmpty(): boolean {
    return this.books.length === 0;
  }

  // Bascule le statut d'un livre entre "Lu" et "Non lu"
  toggleReadStatus(book: Book): void {
    book.isRead = !book.isRead;
  }
}
