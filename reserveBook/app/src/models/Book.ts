import { Author } from "./Author";
import { BookStorage } from "./BookStorage";

export interface Book {
  id: number;
  title: string;
  BookCover: BookCover;
}

export interface BookDetailed extends Book {
  description: string;
  genre: string;
  publishingDate: string;
  pages: number;
  publisher: string;
  language: string;
  authors: Author[];
  storage: BookStorage[];
}

export interface BookCover {
  id: number;
  imageURL: string;
  bookId: number;
}
