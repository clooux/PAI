import { useQuery } from "@tanstack/react-query";
import { ApiURL } from "../api/api";
import { useUserStore } from "../stores/UserStore";
import { FaUser } from "react-icons/fa";
import { Order } from "../models/Order";

const getPastOrders = async (userId: string) => {
  const response = await fetch(ApiURL + "order/user/past/" + userId, {
    method: "GET",
  });
  const data = (await response.json()) as Promise<Order[]>;
  return data;
};

const getCurrentOrders = async (userId: string) => {
  const response = await fetch(ApiURL + "order/user/current/" + userId, {
    method: "GET",
  });
  const data = (await response.json()) as Promise<Order[]>;
  return data;
};

function UserPage() {
  const { firstName, lastName, email, id } = useUserStore();

  const { data: currentOrders, isLoading } = useQuery({
    queryKey: ["currentOrders"],
    enabled: id != null,
    queryFn: async () => getCurrentOrders(id?.toString() as string),
  });

  const { data: pastOrders } = useQuery({
    queryKey: ["pastOrders"],
    enabled: id != null,
    queryFn: async () => getPastOrders(id?.toString() as string),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full h-full bg-base-200">
      <div className="flex flex-row w-full">
        <div className="flex flex-row p-20 ">
          <div className="flex justify-center items-center bg-base-100 h-44 w-44 rounded-full shadow-md border-2">
            <FaUser size="100" />
          </div>
          <div className="flex flex-col justify-center ml-10">
            <h1 className="text-4xl font-bold text-neutral-focus">
              {firstName} {lastName}
            </h1>
            <h3 className="text-2xl font-semibold">{email}</h3>
          </div>
        </div>
        <div className="flex flex-col items-center w-full p-20">
          <div className="flex flex-col items-center bg-primary p-5 rounded-md">
            <h4 className="text-3xl font-semibold">Current Orders</h4>
            <table className="table table-zebra mt-10 w-full xl">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Start Date</th>
                  <th>Return Date</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders?.map((currentOrder) => (
                  <tr key={currentOrder.id}>
                    <td className="flex-wrap">
                      {currentOrder.storage.book.title}
                    </td>
                    <td>
                      {currentOrder.startDate.slice(
                        0,
                        currentOrder.startDate.indexOf("T")
                      )}
                    </td>
                    <td>
                      {currentOrder.returnDate.slice(
                        0,
                        currentOrder.returnDate.indexOf("T")
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full p-5">
        <div className="flex flex-col justify-center text-center bg-secondary p-5 rounded-md">
          <h4 className="text-3xl font-semibold">Past Orders</h4>
          <table className="table mt-10 w-full xl">
            <thead>
              <tr>
                <th>Book</th>
                <th>Start Date</th>
                <th>Return Date</th>
                <th>Returned Date</th>
              </tr>
            </thead>
            <tbody>
              {pastOrders?.map((pastOrder) => (
                <tr key={pastOrder.id}>
                  <td className="flex-wrap">{pastOrder.storage.book.title}</td>
                  <td>
                    {pastOrder.startDate.slice(
                      0,
                      pastOrder.startDate.indexOf("T")
                    )}
                  </td>
                  <td>
                    {pastOrder.returnDate.slice(
                      0,
                      pastOrder.returnDate.indexOf("T")
                    )}
                  </td>
                  <td>
                    {pastOrder.returnedDate.slice(
                      0,
                      pastOrder.returnedDate.indexOf("T")
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
