'use client';

import { useState } from 'react';
import React from 'react';

// export const metadata = {
//   title: 'Resources',
//   description: 'Helpful resources and materials',
// };


// testing up everything hahahahahahahaha
type ResourceType = 'Course Material' | 'Past Question' | 'Textbook' | 'Guide' | 'Template' | 'Video';
type ResourceFaculty = 'All' | 'Science' | 'Arts' | 'Business' | 'Law' | 'Education' | 'Social Sciences' | 'Engineering';

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  faculty: string;
  course?: string;
  description: string;
  downloadUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  uploadDate: string;
  downloadCount: number;
  featured?: boolean;
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<'All' | ResourceType>('All');
  const [activeFaculty, setActiveFaculty] = useState<ResourceFaculty>('All');
  
  // Sample resources data - in a real app this would come from an API
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science Study Guide',
      type: 'Guide',
      faculty: 'Science',
      course: 'CSC101',
      description: 'A comprehensive study guide for the Introduction to Computer Science course, covering all major topics and key concepts.',
      downloadUrl: '/resources/csc101-guide.pdf',
      fileSize: '2.3 MB',
      uploadDate: '2024-04-15',
      downloadCount: 1256,
      featured: true,
    },
    {
      id: '2',
      title: 'Business Administration Past Questions (2019-2023)',
      type: 'Past Question',
      faculty: 'Business',
      course: 'BUS201',
      description: 'Compilation of past examination questions for Business Administration from 2019 to 2023, with sample answers.',
      downloadUrl: '/resources/bus201-past-questions.pdf',
      fileSize: '4.7 MB',
      uploadDate: '2023-12-10',
      downloadCount: 3421,
    },
    {
      id: '3',
      title: 'Criminal Law Textbook',
      type: 'Textbook',
      faculty: 'Law',
      course: 'LAW301',
      description: 'The official textbook for Criminal Law, including case studies and practical applications of legal principles.',
      downloadUrl: '/resources/law301-textbook.pdf',
      fileSize: '12.1 MB',
      uploadDate: '2024-01-25',
      downloadCount: 876,
    },
    {
      id: '4',
      title: 'Educational Psychology Lecture Notes',
      type: 'Course Material',
      faculty: 'Education',
      course: 'EDU202',
      description: 'Detailed lecture notes covering the theories and applications of educational psychology in classroom settings.',
      downloadUrl: '/resources/edu202-notes.pdf',
      fileSize: '3.6 MB',
      uploadDate: '2024-02-18',
      downloadCount: 1543,
    },
    {
      id: '5',
      title: 'Research Methodology Template',
      type: 'Template',
      faculty: 'Social Sciences',
      description: 'A standardized template for research proposals and dissertations, following NOUN guidelines and formatting rules.',
      downloadUrl: '/resources/research-template.docx',
      fileSize: '1.2 MB',
      uploadDate: '2023-11-05',
      downloadCount: 2789,
    },
    {
      id: '6',
      title: 'Laboratory Techniques Video Series',
      type: 'Video',
      faculty: 'Science',
      course: 'BIO203',
      description: 'Video demonstrations of key laboratory techniques required for biology practical examinations.',
      externalUrl: 'https://video.nounedu.net/biology-lab-series',
      uploadDate: '2024-03-20',
      downloadCount: 678,
    },
    {
      id: '7',
      title: 'Advanced Calculus Problem Set',
      type: 'Course Material',
      faculty: 'Science',
      course: 'MTH302',
      description: 'Practice problems and solutions for advanced calculus topics including multivariable calculus and differential equations.',
      downloadUrl: '/resources/mth302-problems.pdf',
      fileSize: '6.1 MB',
      uploadDate: '2023-10-12',
      downloadCount: 1987,
    },
    {
      id: '8',
      title: 'Economics Principles and Applications',
      type: 'Course Material',
      faculty: 'Business',
      course: 'ECO101',
      description: 'Course materials covering microeconomics and macroeconomics principles with real-world applications.',
      downloadUrl: '/resources/economics-principles.pdf',
      fileSize: '8.4 MB',
      uploadDate: '2023-09-18',
      downloadCount: 3254,
    },
  ];
  
  const resourceTypes: ('All' | ResourceType)[] = ['All', 'Course Material', 'Past Question', 'Textbook', 'Guide', 'Template', 'Video'];
  const faculties: ResourceFaculty[] = ['All', 'Science', 'Arts', 'Business', 'Law', 'Education', 'Social Sciences', 'Engineering'];
  
  // Filter resources based on search, type, and faculty
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = activeType === 'All' || resource.type === activeType;
    const matchesFaculty = activeFaculty === 'All' || resource.faculty === activeFaculty;
    
    return matchesSearch && matchesType && matchesFaculty;
  });
  
  const featuredResource = resources.find(resource => resource.featured);

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Function to get appropriate icon for resource type
  const getResourceIcon = (type: ResourceType) => {
    switch(type) {
      case 'Course Material':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        );
      case 'Past Question':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      case 'Textbook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        );
      case 'Guide':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'Template':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        );
      case 'Video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <p className="mb-6">
        Explore our collection of resources, guides, and materials to help you get the most out of our services.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Guides</h2>
          <p>Comprehensive guides to help you navigate our platform.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Guides
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Documentation</h2>
          <p>Technical documentation and API references.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Docs
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Templates</h2>
          <p>Ready-to-use templates and examples.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Templates
          </button>
        </div>
      </div>
    </div>
  );
}
