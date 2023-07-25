import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";
import BookOverviewPage from "./pages/BookOverviewPage";
import UserPage from "./pages/UserPage";
import ReservePage from "./pages/ReservePage";
import { useUserStore } from "./stores/UserStore";
import { ReactElement } from "react";
import jwtDecode from "jwt-decode";
import { User } from "./models/User";

function PrivateRoute({ children }: { children: ReactElement }) {
  const { id } = useUserStore();
  return id ? children : <Navigate to="/login" />;
}

function App() {
  const setUser = useUserStore((state) => state.setUser);

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedToken: User = jwtDecode(accessToken as string);
    setUser(decodedToken);
  }

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
            path="reserve"
            element={
              <PrivateRoute>
                <ReservePage />
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
