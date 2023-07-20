import { Author } from "./Author";

export interface Book {
  id: number;
  title: string;
  BookCover: BookCover;
}

export interface BookDetails extends Book {
  description: string;
  genre: string;
  publishingDate: Date;
  pages: number;
  publisher: string;
  language: string;
  authors: Author[];
}

export interface BookCover {
  id: number;
  imageURL: string;
  bookId: number;
}