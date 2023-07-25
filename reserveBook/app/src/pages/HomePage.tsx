function HomePage() {
  return (
    <div className="flex flex-col items-center w-full h-full bg-base-200 pt-10">
      <div className="flex flex-col justify-center items-center p-4 gap-4">
        <h1 className=" text-5xl font-bold ">
          It's time to <span className="text-neutral">reserve</span>Book!
        </h1>
        <p className="text-lg pt-10 w-9/12">
          This application allows users to book their favorite position from our
          library. You can traverse offered position in books page, which shows
          every book with it's cover.
        </p>
        <p className="text-lg pt-4 w-9/12">
          To reserve a book you have to be a registered user in our application
          and logged in while trying to reserve a position.
        </p>
        <p className="text-lg pt-4 w-9/12">
          There is possibility that book can be reserved but in the proccess
          some other individual might reserve copy that you wanted. In this case
          you have wait for someone to return the book.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
