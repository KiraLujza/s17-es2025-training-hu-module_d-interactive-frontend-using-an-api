import myAxios, { getAuthHeaders } from "../services/api";
import { createContext, useState, useEffect } from "react";

// 1. Context létrehozása
export const AuthContext = createContext();

const [token, setToken] = useState(localStorage.getItem("token"));
const [user, setUser] = useState([]);
const [loading, setLoading] = useState(true);

function  login(adat){
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
      setUser(response.data.user);
      /* Átnavigálunk a kezdőlapra */
      window.location.href = "/";
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      setLoading(false);
    });
}

function register(adat){
    setLoading(true);
    myAxios
    .post("/users/register", adat)
    .then(function (response) {
      
      localStorage.setItem("token", response.data.token);
     
      setToken(response.data.token);
    
      setUser(response.data.user);

      window.location.href = "/";
    })
    .catch(function (error) {
   
      console.log(error);
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
      setUser(response.data.user); //  beállítjuk a user-t
    })
    .catch((error) => {
      console.log(error);
      setUser(null); // ha hiba, töröljük a user-t
      //localStorage.removeItem("token"); // ha invalid token
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

// 2. Provider komponens
export function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

