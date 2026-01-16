import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/navigation.css";

export default function Navigation() {
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
              {user.creditBalance ? user.creditBalance : "0"} credits
            </li>
            <li>Welcome {user.name ? user.name : "Guest"}</li>
          </ul>
          <button className="nav-btn">Kijelentkezés</button>
        </div>
      </div>
    </div>
  );
}
