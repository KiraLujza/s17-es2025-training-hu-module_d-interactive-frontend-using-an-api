import myAxios, { getAuthHeaders } from "../services/Api";
import { createContext, useState } from "react";

// 1. Context létrehozása
export const MentorContext = createContext();

// 2. Provider komponens
export function MentorProvider({ children }) {
  const [mentorList, setMentorList] = useState([]);
  const [loading, setLoading] = useState(true);

  function getMentor() {
    setLoading(true);
    myAxios
      .get("/mentors/sessions", { headers: getAuthHeaders() })
      .then((response) => {
        setMentorList(response.data.sessions);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <MentorContext.Provider value={{ mentorList, loading, getMentor }}>
      {children}
    </MentorContext.Provider>
  );
}