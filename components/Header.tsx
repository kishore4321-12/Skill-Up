
import React from 'react';
import { UserCircleIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <svg className="h-8 w-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.002z" />
              </svg>
              <span className="text-2xl font-bold text-gray-800">Skill Up</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Courses</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">My Learning</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Career Paths</a>
          </div>
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-500 hover:text-blue-600 cursor-pointer"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
