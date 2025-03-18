'use client';

import { useState } from 'react';
import AnimatedElement from '@/components/ui/animated-element';
import ModernCard from '@/components/ui/modern-card';
import ScrollReveal from '@/components/ui/scroll-reveal';
import ModernButton from '@/components/ui/modern-button';

type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  featured?: boolean;
};

type NewsCategory = 'All' | 'Academic' | 'Events' | 'Announcements' | 'Exams';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');
  
  // Sample news data - in a real app this would come from an API
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'NOUN Announces Revised Examination Timetable for 2024',
      category: 'Exams',
      date: 'May 15, 2024',
      excerpt: 'The National Open University of Nigeria has released the revised examination timetable for the 2024 academic session. Students are advised to check their portals for details.',
      image: '/images/news/exams.jpg',
      featured: true,
    },
    {
      id: '2',
      title: 'New Faculty of Computing Sciences Launches Advanced Degree Programs',
      category: 'Academic',
      date: 'May 10, 2024',
      excerpt: 'The Faculty of Computing Sciences has announced new Master's and Doctoral programs in Artificial Intelligence and Data Science, set to begin in the next academic session.',
      image: '/images/news/computing.jpg',
    },
    {
      id: '3',
      title: 'Annual NOUN Student Conference Scheduled for July',
      category: 'Events',
      date: 'May 8, 2024',
      excerpt: 'The annual student conference will take place virtually from July 15-17. Registration is now open for all current students.',
      image: '/images/news/conference.jpg',
    },
    {
      id: '4',
      title: 'Important Update on TMA Submission Deadlines',
      category: 'Academic',
      date: 'May 5, 2024',
      excerpt: 'The deadline for Tutor-Marked Assignments has been extended by one week. Students now have until May 20 to submit all pending TMAs.',
      image: '/images/news/deadline.jpg',
    },
    {
      id: '5',
      title: 'NOUN Partners with International Universities for Exchange Programs',
      category: 'Announcements',
      date: 'May 3, 2024',
      excerpt: 'The university has signed MoUs with three international universities to facilitate student and faculty exchange programs starting next semester.',
      image: '/images/news/partnership.jpg',
    },
    {
      id: '6',
      title: 'Library Resources Expanded with New Digital Collections',
      category: 'Academic',
      date: 'April 28, 2024',
      excerpt: 'The university library has added over 10,000 new e-books and digital journals accessible through the student portal.',
      image: '/images/news/library.jpg',
    },
    {
      id: '7',
      title: 'Examination Guidelines for Remote Proctoring Released',
      category: 'Exams',
      date: 'April 25, 2024',
      excerpt: 'New guidelines for remotely proctored exams have been published. Students must ensure they have compatible devices and stable internet connections.',
      image: '/images/news/remote-exam.jpg',
    },
    {
      id: '8',
      title: 'University Convocation Ceremony Dates Announced',
      category: 'Events',
      date: 'April 20, 2024',
      excerpt: 'The 13th convocation ceremony will be held on August 5-6, 2024. Graduating students should check their eligibility status on the portal.',
      image: '/images/news/convocation.jpg',
    },
  ];
  
  const categories: NewsCategory[] = ['All', 'Academic', 'Events', 'Announcements', 'Exams'];
  
  const filteredNews = activeCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);
    
  const featuredNews = newsItems.find(item => item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedElement animation="fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">University News & Updates</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Stay informed with the latest announcements, events, and academic information
          </p>
        </AnimatedElement>

        {/* Featured News */}
        {featuredNews && (
          <AnimatedElement animation="slide-up" delay={200}>
            <div className="mb-12">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={featuredNews.image || 'https://via.placeholder.com/1200x600?text=NOUN+News'}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-xs font-medium mb-3">
                    {featuredNews.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{featuredNews.title}</h2>
                  <p className="text-sm md:text-base opacity-80 mb-3">{featuredNews.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-70">{featuredNews.date}</span>
                    <ModernButton href={`/news/${featuredNews.id}`} size="sm">
                      Read More
                    </ModernButton>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        )}

        {/* Category Filters */}
        <AnimatedElement animation="fade-in" delay={300} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
                  ${activeCategory === category 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedElement>

        {/* News Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.filter(item => !item.featured).map((item, index) => (
            <ScrollReveal key={item.id} delay={index % 3}>
              <ModernCard className="h-full hover:shadow-xl card-hover transition-all duration-300">
                <div className="h-48 rounded-t-xl overflow-hidden">
                  <img 
                    src={item.image || 'https://via.placeholder.com/400x200?text=NOUN+News'} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.excerpt}</p>
                  <div className="flex justify-end">
                    <ModernButton href={`/news/${item.id}`} variant="outline" size="sm">
                      Read More
                    </ModernButton>
                  </div>
                </div>
              </ModernCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-1">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white">1</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">2</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">3</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
