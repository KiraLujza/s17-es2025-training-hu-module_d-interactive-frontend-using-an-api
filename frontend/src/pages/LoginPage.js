import React, { useState, useContext } from "react";
import "./css/login.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { login, serverError, clearServerError, loading } = useContext(AuthContext);

  function validateForm() {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Az email cím kötelező";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Érvénytelen email formátum";
    }

    if (!password) {
      newErrors.password = "A jelszó kötelező";
    } else if (password.length < 6) {
      newErrors.password =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie";
    }

    return newErrors;
  }
  function submit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = { email, password };
    login(data);
  }
  return (
    <div className="page">
      <div className="login">
        <h1>Üdv újra!</h1>
        {serverError && <div className="alert-error">{serverError}</div>}
        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email címed"
            onChange={(e) => {
              setEmail(e.target.value);
              if (serverError) clearServerError();
            }}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => {
              setPassword(e.target.value);
              if (serverError) clearServerError();
            }}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
        </form>
        <p className="bottom-text">
          Ingyenes a regisztráció!{" "}
          <NavLink to="/register">Új fiók létrehozása</NavLink>
        </p>
      </div>
    </div>
  );
}
