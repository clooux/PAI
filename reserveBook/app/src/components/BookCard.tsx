import { Link } from "react-router-dom";
import { Book } from "../models/Book";
import { TbPhotoCancel } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { ApiURL } from "../api/api";

const getImage = async (imageURL: string) => {
  const response = await fetch(ApiURL + "files/" + imageURL);
  const blob = await response.blob();
  const imgBlob = URL.createObjectURL(blob);
  return imgBlob;
};

function BookCard(book: Book) {
  const { data: bookCoverImg } = useQuery({
    queryKey: ["bookCover", book.BookCover],
    queryFn: () => getImage(book.BookCover.imageURL),
  });

  return (
    <div className="card w-72 bg-primary shadow-m m-5">
      <Link to={`/books/${book.id}`} className="w-full px-5 pt-5 h-96">
        <figure>
          {bookCoverImg ? (
            <img className="h-80" src={bookCoverImg} alt="Book" />
          ) : (
            <div className="flex justify-center items-center w-full h-80 bg-base-100">
              <TbPhotoCancel />
            </div>
          )}
        </figure>
      </Link>
      <div className="card-body mt-[-3rem]">
        <h2 className="card-title flex-wrap">{book.title}</h2>
      </div>
    </div>
  );
}

export default BookCard;