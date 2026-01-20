import React, { useContext, useEffect } from 'react'
import { CoursesContext } from '../contexts/CoursesContext'
import Course from '../components/Course'
import CourseSearch from '../components/CourseSearch'

export default function CoursesPage() {
  const { getCourses, filteredList, loading, enrollCourse } = useContext(CoursesContext)

  useEffect(() => {
    getCourses()
  }, [])

  const handleEnroll = (courseId) => {
    enrollCourse(courseId)
  }

  if (loading) {
    return <div>Loading courses...</div>
  }

  return (
    <>
      <CourseSearch />
      <div className="courses">
        {filteredList.map((course) => {
          return (
            <Course
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
            />
          );
        })}
      </div>
    </>
  );
}