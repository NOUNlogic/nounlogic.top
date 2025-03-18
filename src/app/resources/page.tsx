'use client';

import { useState } from 'react';
import ModernCard from '@/components/ui/modern-card';
import ModernButton from '@/components/ui/modern-button';
import AnimatedElement from '@/components/ui/animated-element';
import ScrollReveal from '@/components/ui/scroll-reveal';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedElement animation="fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Study Resources</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Access course materials, past questions, and study guides for all NOUN programs
          </p>
        </AnimatedElement>

        {/* Search and Filter Section */}
        <AnimatedElement animation="slide-up" delay={200} className="mb-12">
          <ModernCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for resources..." 
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Resource Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resource Type</label>
                <select 
                  className="w-full py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={activeType}
                  onChange={(e) => setActiveType(e.target.value as 'All' | ResourceType)}
                >
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Faculty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faculty</label>
                <select 
                  className="w-full py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={activeFaculty}
                  onChange={(e) => setActiveFaculty(e.target.value as ResourceFaculty)}
                >
                  {faculties.map(faculty => (
                    <option key={faculty} value={faculty}>{faculty}</option>
                  ))}
                </select>
              </div>
            </div>
          </ModernCard>
        </AnimatedElement>

        {/* Featured Resource */}
        {featuredResource && (
          <AnimatedElement animation="slide-up" delay={300} className="mb-12">
            <ModernCard className="p-0 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/3 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium mb-3">
                    Featured Resource
                  </span>
                  <h2 className="text-2xl font-bold mb-3">{featuredResource.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
                      {getResourceIcon(featuredResource.type)}
                      <span className="ml-1">{featuredResource.type}</span>
                    </span>
                    {featuredResource.course && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
                        Course: {featuredResource.course}
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
                      Faculty: {featuredResource.faculty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{featuredResource.description}</p>
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(featuredResource.uploadDate)}</span>
                      {featuredResource.fileSize && <span>{featuredResource.fileSize}</span>}
                      <span>{featuredResource.downloadCount.toLocaleString()} downloads</span>
                    </div>
                    <ModernButton 
                      href={featuredResource.downloadUrl || featuredResource.externalUrl || '#'}
                      target={featuredResource.externalUrl ? "_blank" : undefined}
                    >
                      {featuredResource.downloadUrl ? 'Download' : 'View Resource'}
                    </ModernButton>
                  </div>
                </div>
                <div className="md:w-1/3 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                      {getResourceIcon(featuredResource.type)}
                    </div>
                    <p className="font-medium">Most Popular Resource</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Downloaded {featuredResource.downloadCount.toLocaleString()} times</p>
                  </div>
                </div>
              </div>
            </ModernCard>
          </AnimatedElement>
        )}

        {/* Resource List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.filter(item => !item.featured).map((resource, index) => (
            <ScrollReveal key={resource.id} delay={index % 3}>
              <ModernCard className="h-full hover:shadow-xl transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-lg line-clamp-2">{resource.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      {resource.course && <span>Course: {resource.course}</span>}
                      <span>•</span>
                      <span>Faculty: {resource.faculty}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{resource.description}</p>
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="text-gray-500 dark:text-gray-400">
                    {formatDate(resource.uploadDate)}
                  </div>
                  {resource.fileSize && (
                    <div className="text-gray-500 dark:text-gray-400">
                      {resource.fileSize}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {resource.downloadCount.toLocaleString()} downloads
                  </div>
                  <ModernButton 
                    href={resource.downloadUrl || resource.externalUrl || '#'}
                    target={resource.externalUrl ? "_blank" : undefined}
                    variant="outline"
                    size="sm"
                  >
                    {resource.downloadUrl ? 'Download' : 'View Resource'}
                  </ModernButton>
                </div>
              </ModernCard>
            </ScrollReveal>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try changing your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
