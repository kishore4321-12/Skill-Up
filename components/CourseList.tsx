
import React from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
  onCourseSelect: (course: Course) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onCourseSelect }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onSelect={onCourseSelect} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
