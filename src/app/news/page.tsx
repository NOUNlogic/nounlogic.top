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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <p>This is the News page content.</p>
    </div>
  );
}
