import { BookStorageWithBook } from "./BookStorage";

export interface Order {
  id: number;
  startDate: string;
  returnDate: string;
  returnedDate: string;
  storage: BookStorageWithBook;
  userId: number;
}
