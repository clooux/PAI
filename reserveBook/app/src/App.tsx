import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";
import BookOverviewPage from "./pages/BookOverviewPage";
import UserPage from "./pages/UserPage";
import BorrowPage from "./pages/BorrowPage";
import { useUserStore } from "./stores/UserStore";
import { ReactElement } from "react";

function PrivateRoute({ children }: { children: ReactElement }) {
  console.log(children);
  const { id } = useUserStore();
  return id ? children : <Navigate to="login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="books">
          <Route index element={<BookOverviewPage />} />
          <Route path=":bookId" element={<BookPage />} />
        </Route>
        <Route path="user">
          <Route
            index
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="borrow"
            element={
              <PrivateRoute>
                <BorrowPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;