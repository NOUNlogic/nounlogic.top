import Link from "next/link";
import FeatureCard from "@/components/feature-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            National Open University of Nigeria - Student Hub
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Your all-in-one platform for student collaboration, resources, and community
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-50 transition-colors">
              Get Started
            </Link>
            <Link href="/about" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Connect with Peers" 
              description="Chat, make friends, and collaborate with fellow NOUN students"
              icon="users"
            />
            <FeatureCard 
              title="AI Study Assistant" 
              description="Get quick answers to your academic questions with our AI helper"
              icon="robot"
            />
            <FeatureCard 
              title="Voice & Video Calls" 
              description="Study groups and discussions made easy with integrated calling"
              icon="video"
            />
            <FeatureCard 
              title="Latest University News" 
              description="Stay updated with announcements, events, and important deadlines"
              icon="newspaper"
            />
            <FeatureCard 
              title="Resource Library" 
              description="Access study materials, past questions, and helpful resources"
              icon="book"
            />
            <FeatureCard 
              title="Community Forums" 
              description="Discuss courses, share insights, and solve problems together"
              icon="comments"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
