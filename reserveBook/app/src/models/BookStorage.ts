import { Book } from "./Book";
import { Order } from "./Order";

export interface BookStorage {
  id: number;
}

export interface BookStorageExtended extends BookStorage {
  bookId: number;
  orders: Order[];
  book: Book;
}

export interface BookStorageWithBook extends BookStorage {
  book: Book;
}
