import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import { Book } from "../models/Book";
import { ApiURL } from "../api/api";

const getBooks = async () => {
  const response = await fetch(ApiURL + "book/simple", {
    method: "GET",
  });
  const data = (await response.json()) as Promise<Book[]>;
  return data;
};

function BookOverviewPage() {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["books"], queryFn: getBooks });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Couldn't find books.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-base-200 pt-10">
      <h1 className="text-5xl font-bold">Books in our collection:</h1>
      <div className="flex flex-row mt-12 flex-wrap justify-center">
        {books.map((book) => (
          <BookCard {...book} key={book.id} />
        ))}
      </div>
    </div>
  );
}

export default BookOverviewPage;