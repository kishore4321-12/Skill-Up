
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import CourseList from './components/CourseList';
import CourseDetailView from './components/CourseDetailView';
import { courses } from './constants';
import { Course } from './types';

const App: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCourse ? (
          <CourseDetailView course={selectedCourse} onBack={handleBackToList} />
        ) : (
          <>
            <HeroSection />
            <CourseList courses={courses} onCourseSelect={handleCourseSelect} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
