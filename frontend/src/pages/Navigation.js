import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/navigation.css";
import { AuthContext } from "../contexts/AuthContext";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="nav-brand">
          SKILLSHARE ACADEMY
        </Link>

        <div className="nav-links">
          <NavLink to="/dashboard" className="nav-link">
            Írányítópult
          </NavLink>
          <NavLink to="/courses" className="nav-link">
            Képzések
          </NavLink>
          <NavLink to="/mentors" className="nav-link">
            Mentorok
          </NavLink>
        </div>

        <div className="nav-right-side">
          <ul>
            <li className="kiemelt">
              {user?.user?.creditBalance ? user.user.creditBalance : "0"} credits
            </li>
            <li>Welcome {user?.user?.name ? user.user.name : "Guest"}</li>
            <li className="kiemelt" onClick={logout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
