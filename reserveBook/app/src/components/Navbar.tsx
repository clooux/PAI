function Navbar() {
  return (
    <div className="navbar bg-accent mb-5">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">reserveBook</a>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case bg-red-100">Books</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar bg-white"
          >
            <div className="w-10 rounded-full">
              {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
