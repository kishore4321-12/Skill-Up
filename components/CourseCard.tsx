
import React from 'react';
import { Course } from '../types';
import { StarIcon } from './icons';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelect(course)}
    >
      <img className="h-48 w-full object-cover" src={course.imageUrl} alt={course.title} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
        <div className="flex items-center mt-auto">
          <span className="text-yellow-500 font-bold mr-1">{course.rating}</span>
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-gray-500 ml-2">({course.totalRatings.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
