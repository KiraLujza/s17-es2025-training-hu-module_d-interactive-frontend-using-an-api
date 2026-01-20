import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { MentorContext } from "../contexts/MentorContext";
import Mentor from "../components/Mentor";
import "../pages/css/mentors.css";

export default function MentorsPage() {
  const { user } = useContext(AuthContext);
  const { mentorList, loading, getMentor } = useContext(MentorContext);

  useEffect(() => {
    getMentor();
  }, []);

  if (loading) {
    return <div>Betöltés folyamatban...</div>;
  }

  return (
    <div className="mentors-page">
      <h1>Mentor Sessions</h1>
      <p>Credit Balance: {user?.creditBalance || 0}</p>

      <div className="mentors-list">
        {mentorList.map((mentor) => (
          <Mentor key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}