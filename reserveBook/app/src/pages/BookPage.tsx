import { Link, useParams } from "react-router-dom";
import { ApiURL } from "../api/api";
import { BookDetails } from "../models/Book";
import { useQuery } from "@tanstack/react-query";
import { TbPhotoCancel } from "react-icons/tb";

const getBook = async (id: string) => {
  const response = await fetch(ApiURL + "book/" + id, {
    method: "GET",
  });
  const data = (await response.json()) as Promise<BookDetails>;
  return data;
};

const getImage = async (imageURL: string) => {
  const response = await fetch(ApiURL + "files/" + imageURL);
  const blob = await response.blob();
  const imgBlob = URL.createObjectURL(blob);
  return imgBlob;
};

function BookPage() {
  const { bookId } = useParams();

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () => getBook(bookId as string),
  });

  const { data: bookCoverImg } = useQuery({
    queryKey: ["bookCover", book?.id],
    queryFn: () => getImage(book?.BookCover.imageURL as string),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-base-200">
      <div className="flex flex-row items-start p-20 ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-secondary rounded-lg shadow-sm h-[22rem] min-h-[22rem] w-[18rem] min-w-[18rem]">
            {bookCoverImg ? (
              <img className="h-80" src={bookCoverImg} alt="Book" />
            ) : (
              <div className="flex justify-center items-center w-full h-80 bg-base-100">
                <TbPhotoCancel />
              </div>
            )}
          </div>
          <Link
            to={"/user/borrow"}
            state={{ bookId: book?.id, storageId: "1" }}
            className="btn btn-primary mt-5 w-40"
          >
            Rent
          </Link>
        </div>

        <div className="ml-10">
          <h1 className="text-4xl font-bold flex-wrap">{book?.title}</h1>
          <div className="m-5">
            {book?.authors.map((author) => (
              <div
                className="text-2xl text-neutral font-semibold"
                key={author.id}
              >
                {author.firstName} {author.lastName}
              </div>
            ))}
            <div className="font-medium text-lg">{book?.genre}</div>
            <div className="mt-5">
              <div className="mt-5">
                Language: <span className="font-medium">{book?.language}</span>
              </div>
              <div className="mt-5">
                Publisher:{" "}
                <span className="font-medium">{book?.publisher}</span>
              </div>
              <div className="mt-5">
                Publication Date:{" "}
                <span className="font-medium">
                  {book?.publishingDate.slice(
                    0,
                    book?.publishingDate.indexOf("T")
                  )}
                </span>
              </div>
              <div className="mt-5">
                Length: <span className="font-medium">{book?.pages}</span>
              </div>
              <p className="m-10 line-clamp-3 hover: hover:line-clamp-none">
                {book?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;