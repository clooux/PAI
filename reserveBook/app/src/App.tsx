import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";
import BookOverviewPage from "./pages/BookOverviewPage";
import UserPage from "./pages/UserPage";
import BorrowPage from "./pages/BorrowPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="books">
          <Route index element={<BookOverviewPage />} />
          <Route path=":id" element={<BookPage />} />
        </Route>
        <Route path="user">
          <Route index element={<UserPage />} />
          <Route path="borrow" element={<BorrowPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
