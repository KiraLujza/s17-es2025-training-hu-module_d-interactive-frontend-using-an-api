import myAxios, { getAuthHeaders } from "../services/Api";
import { createContext, useState, useEffect } from "react";

// 1. Context létrehozása
export const AuthContext = createContext();

// 2. Provider komponens
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  function login(adat) {
    setLoading(true);
    myAxios
      .post("/users/login", adat)
      .then(function (response) {
        // handle success
        /* ha sikerült a bejelentkezés elmentjük a  válaszban kapott tokent a lokalstorage-ben.   */
        localStorage.setItem("token", response.data.token);
        /* beállítjuk a tokent */
        setToken(response.data.token);
        //beállítjuk a usert is.
        setUser(response.data);
        /* Átnavigálunk a kezdőlapra */
        clearServerError();
        window.location.href = "/";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        hibakezeles(error.response);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  }

  function register(adat) {
    setLoading(true);
    myAxios
      .post("/users/register", adat)
      .then(function (response) {

        localStorage.setItem("token", response.data.token);

        setToken(response.data.token);

        setUser(response.data);

        clearServerError();
        window.location.href = "/";
      })
      .catch(function (error) {

        console.log(error);
        hibakezeles(error.response);
      })
      .finally(function () {

        setLoading(false);
      });
  }

  /* beolvassuk a localstorage-ból a tokent és beállítjuk a felahsználót
   */
  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false); // nincs token, loading vége
      setUser(null);
      return;
    }

    setToken(savedToken);
    setLoading(true);
    /* ha megvan a token, a végpontról lekérdezzk a felhasználó adatait
  a fejléchez mindenképp csatolni kell a tokent. Erre szolgál a getAuthHeaders függvény. */
    myAxios
      .get("/users/me", { headers: getAuthHeaders() })
      .then((response) => {
        setUser(response.data); //  beállítjuk a teljes user objektumot
      })
      .catch((error) => {
        console.log(error);
        setUser(null); // ha hiba, töröljük a user-t
        //localStorage.removeItem("token"); // ha invalid token
        hibakezeles(error.response);
      })
      .finally(() => {
        setLoading(false); //  loading vége, user betöltve
      });
  }

  function logout() {
    /* kijelentkezéskor nullára állítjuka  tokent és a felhasználót. */
    setUser(null);
    setToken(null);
    /* töröljük a tokent a localstorage-ból */
    localStorage.removeItem("token");
    /* Újratöltjük az oldalt */
    window.location.reload();
  }

  function clearServerError() {
    setServerError(null);
  }

  function hibakezeles(error, context = 'general') {
    if (error?.status === 400) {
      if (context === 'login') {
        setServerError("A megadott adatok nem szerepelnek az adatbázisban");
      } else if (context === 'register') {
        setServerError("Ez az email cím már használatban van");
      } else {
        setServerError("Hibás kérés");
      }
    } else if (error?.status === 401) {
      setServerError(
        "A hitelesítési token érvénytelen vagy lejárt. Menj a login oldalra!"
      );
      window.location.href = "/login";
    } else if (error?.status === 403) {
      setServerError("Nincs jogosultsága a kért művelethez!");
    } else if (error?.status === 404) {
      setServerError("A kért erőforrás nem található!");
    } else if (error?.status === 422) {
      setServerError("Validációs hiba");
    } else if (error?.status === 500) {
      setServerError("Szerver hiba történt.");
    } else {
      setServerError("Ismeretlen hiba történt.");
    }
  }
  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout, loadUser, serverError, clearServerError }}>
      {children}
    </AuthContext.Provider>
  );
}

