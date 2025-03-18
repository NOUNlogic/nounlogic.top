import FeatureCard from "@/components/feature-card";
import ModernButton from "@/components/ui/modern-button";
import ParallaxSection from "@/components/ui/parallax-section";
import AnimatedElement from "@/components/ui/animated-element";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section with Parallax */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 px-6">
        <ParallaxSection speed={0.1} className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
          </div>
        </ParallaxSection>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedElement animation="fade-in" className="mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              National Open University of Nigeria <span className="block mt-2">Student Hub</span>
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={300} className="mb-8">
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 drop-shadow-md">
              Your all-in-one platform for student collaboration, resources, and community
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="scale-in" delay={600}>
            <div className="flex flex-wrap justify-center gap-4">
              <ModernButton href="/register" variant="primary" size="lg">
                Get Started
              </ModernButton>
              <ModernButton href="/about" variant="outline" size="lg">
                Learn More
              </ModernButton>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Features section with scroll reveal */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-black dark:text-white">
              Everything You Need
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={1}>
            <p className="text-center text-black dark:text-white max-w-2xl mx-auto mb-16">
              Connect with fellow students, access resources, and stay updated with everything happening at NOUN.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Connect with Peers" 
              description="Chat, make friends, and collaborate with fellow NOUN students"
              icon="users"
              delay={1}
            />
            <FeatureCard 
              title="AI Study Assistant" 
              description="Get quick answers to your academic questions with our AI helper"
              icon="robot"
              delay={2}
            />
            <FeatureCard 
              title="Voice & Video Calls" 
              description="Study groups and discussions made easy with integrated calling"
              icon="video"
              delay={3}
            />
            <FeatureCard 
              title="Latest University News" 
              description="Stay updated with announcements, events, and important deadlines"
              icon="newspaper"
              delay={1}
            />
            <FeatureCard 
              title="Resource Library" 
              description="Access study materials, past questions, and helpful resources"
              icon="book"
              delay={2}
            />
            <FeatureCard 
              title="Community Forums" 
              description="Discuss courses, share insights, and solve problems together"
              icon="comments"
              delay={3}
            />
          </div>
        </div>
      </section>
      
      {/* Call to action section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Join Your Campus Community?</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={1}>
            <p className="text-lg mb-10 max-w-2xl mx-auto">
              Sign up today and connect with thousands of NOUN students across Nigeria.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={2}>
            <ModernButton 
              href="/register" 
              variant="primary" 
              size="lg" 
              className="text-blue-700 hover:bg-blue-50 hover:text-blue-800 border-2 border-white/20"
            >
              Create Your Account
            </ModernButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
