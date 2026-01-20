import React from 'react'

export default function Mentor({ mentor }) {
  const sessionBooked = () => {
    // TODO: Implement session booking
    console.log('Session booked for mentor:', mentor.id);
  }

  return (
    <div className="mentor-card">
      <h3>{mentor.mentorName}</h3>
      <p>{mentor.description}</p>

      <div className="session-info">
        <p>
          <strong>Date:</strong>{" "}
          {new Date(mentor.sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {new Date(mentor.sessionDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <p><strong>Credits:</strong> {mentor.creditsRequired}</p>
      </div>

      <div className="button">
        <button
          className={`keret session ${mentor.isAvailable ? "available-button" : "inactive"}`}
          onClick={sessionBooked}
          disabled={!mentor.isAvailable}
        >
          {mentor.isAvailable ? "Available" : "Not available"}
        </button>
      </div>
    </div>
  )
}