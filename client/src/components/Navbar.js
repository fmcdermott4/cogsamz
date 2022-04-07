import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="navbar">
      <NavLink exact to="/" className="navbar-link">
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/cogs" className="navbar-link">
           Cogs Tool
          </NavLink>
          <NavLink to="/servicesselected" className="navbar-link">
            Service Table
          </NavLink>
          <NavLink to="/user" className="navbar-link">
            User
          </NavLink>
          <button className="navbar-link" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="navbar-link">
            Signup
          </NavLink>
        </>
      )}
    </nav>
  );
}
