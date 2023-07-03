import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/UserStore";
import { BiSolidUserCircle } from "react-icons/bi";

function Avatar() {
  const { firstName, lastName, reset } = useUserStore();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    reset();
    navigate("/");
  };

  if (firstName) {
    const initals =
      firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return (
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar bg-red-100"
        >
          {initals}
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NavLink to="/user">User</NavLink>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <NavLink to="/login">
        <div className="btn btn-ghost">
          <BiSolidUserCircle size="24px" />
          Sign in
        </div>
      </NavLink>
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar bg-accent">
      <div className="navbar-start">
        <NavLink className="btn btn-ghost normal-case text-xl" to="/">
          reserveBook
        </NavLink>
      </div>
      <div className="navbar-center">
        <NavLink
          className="btn btn-ghost normal-case text-xl bg-red-100"
          to="/books"
        >
          Books
        </NavLink>
      </div>
      <div className="navbar-end">
        <Avatar />
      </div>
    </div>
  );
}

export default Navbar;
