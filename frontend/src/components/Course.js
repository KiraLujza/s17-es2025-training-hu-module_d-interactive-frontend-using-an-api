import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Course({ course, onEnroll }) {
  const navigate = useNavigate()

  function enroll() {
    if (!course.isEnrolled) {
      onEnroll(course.id);
    }

    navigate(`/courses/1`);
  }

  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.title}</h3>
        <p className="beiratkozva">
          {course.isEnrolled ? "✔" : "📝"}
        </p>
      </div>

      <p className="course-description">{course.description}</p>
      <p className="course-instructor">Instructor: {course.instructor}</p>
      <p className="course-duration">Duration: {course.duration} hours</p>

      <button
        style={{ background: course.isEnrolled ? "lightGreen" : "beige" }}
        className="nagy"
        onClick={enroll}
      >
        {course.isEnrolled ? "continue learning" : "enroll"}
      </button>
    </div>
  )
}