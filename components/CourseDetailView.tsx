
import React from 'react';
import { Course } from '../types';
import Chatbot from './Chatbot';
import { ArrowLeftIcon, StarIcon } from './icons';

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back to Courses
      </button>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{course.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-gray-700 mb-6">
              <div className="flex items-center">
                <span className="font-bold text-yellow-500 mr-1">{course.rating}</span>
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 text-gray-500">({course.totalRatings.toLocaleString()} ratings)</span>
              </div>
              <span>Created by <span className="font-semibold text-blue-700">{course.instructor}</span></span>
            </div>
            <div className="flex items-center space-x-6 border-t border-b border-gray-200 py-4 mb-6 text-sm text-gray-600">
                <span>Level: <span className="font-medium text-gray-800">{course.level}</span></span>
                <span>Duration: <span className="font-medium text-gray-800">{course.duration}</span></span>
            </div>
            
            <img 
                src={course.imageUrl.replace('600/400', '800/450')} // Larger image for detail view
                alt={course.title}
                className="w-full h-auto object-cover rounded-lg mb-8 shadow-md"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.longDescription}</p>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Chatbot course={course} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;
