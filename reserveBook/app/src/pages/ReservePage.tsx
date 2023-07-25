import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/UserStore";
import { BookDetailed } from "../models/Book";
import { ApiURL } from "../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TbPhotoCancel } from "react-icons/tb";
import { BookStorage } from "../models/BookStorage";
import { useState } from "react";

interface ReservationData {
  userId: number;
  storageId: number;
  startDate: Date;
  returnDate: Date;
}

const reserveBook = async (reservation: ReservationData) => {
  const response = await fetch(ApiURL + "order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });
  const data = await response.json();

  return data;
};

const getFreeStorageForBook = async (bookId: string) => {
  const response = await fetch(ApiURL + "storage/free/" + bookId, {
    method: "GET",
  });

  const data = (await response.json()) as Promise<BookStorage[]>;
  return data;
};

function ReservePage() {
  const { id } = useUserStore();
  const {
    book,
    bookCoverImg,
  }: { book: BookDetailed; bookCoverImg: string | undefined } =
    useLocation().state;
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [returnDate, setReturnDate] = useState(
    new Date(startDate.setMonth(startDate.getMonth() + 2))
  );

  const { data: freeStorage, isLoading } = useQuery({
    queryKey: ["freeStorage", book.id],
    queryFn: async () => getFreeStorageForBook(book.id.toString() as string),
  });

  const { mutate: reservation } = useMutation({
    mutationFn: reserveBook,
    onSuccess: () => {
      navigate("/user");
    },
  });

  const reserveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setStartDate(new Date(Date.now()));
    setReturnDate(new Date(startDate.setMonth(startDate.getMonth() + 2)));
    reservation({
      userId: id as number,
      storageId: freeStorage?.find((storage) => storage != undefined)
        ?.id as number,
      startDate: startDate,
      returnDate: returnDate,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-top justify-evenly w-full h-full bg-base-200">
      <div className="flex flex-col w-1/2 items-center p-20">
        <div className="flex justify-center items-center bg-secondary rounded-lg shadow-sm h-96 w-96">
          {bookCoverImg ? (
            <img className="h-80" src={bookCoverImg} alt="Book" />
          ) : (
            <div className="flex justify-center items-center w-9/12 h-80 bg-base-100">
              <TbPhotoCancel />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold flex-wrap p-5">{book.title}</h2>
      </div>
      <div className="flex flex-col w-1/2 items-center justify-center">
        {freeStorage?.length ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">
              Please confirm your reservation
            </h1>
            <div className="flex flex-col justify-center items-center mt-10 bg-neutral rounded-md shadow-md h-64 w-72">
              <div className="text-lg m-5">
                Start Date:{" "}
                <span className="font-semibold text-lg">
                  {startDate.toDateString()}{" "}
                </span>
              </div>
              <div className="text-lg m-5">
                End Date:{" "}
                <span className="font-semibold text-lg">
                  {returnDate.toDateString()}
                </span>
              </div>
              <button className="btn btn-primary m-5" onClick={reserveHandler}>
                reserve Book
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">
              There is not available copy of this book.
            </h1>
            <h1 className=" text-2xl font-semibold">Please try again later.</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservePage;
