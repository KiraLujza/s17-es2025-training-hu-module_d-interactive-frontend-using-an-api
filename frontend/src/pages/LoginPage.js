import React, { useState } from "react";
import "./css/login.css";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
    //login(data);
  }
  return (
    <div className="page">
      <div className="login">
        <h1>Üdv újra!</h1>
        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email címed"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <button type="submit">Bejelentkezés</button>
        </form>
        <p className="bottom-text">
          Ingyenes a regisztráció!{" "}
          <NavLink to="/register">Új fiók létrehozása</NavLink>
        </p>
      </div>
    </div>
  );
}
