import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard">
        <h2>Meeting Manager</h2>
      </Link>

      <div className="nav-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/history">
          History
        </Link>

        <span>
          {user?.name}
        </span>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;