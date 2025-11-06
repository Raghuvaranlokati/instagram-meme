// app/page.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { House, Search, PlaySquare, Heart, User } from 'lucide-react';

export default function Home() {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{x: string, y: string}>>([]);

  // Instagram profile URL
  const instagramUrl = "https://www.instagram.com/millions.move/";

   const handleInstagramClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  // Initialize particle positions on client side
  useEffect(() => {
    const positions = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100 + 'vw',
      y: Math.random() * 100 + 'vh'
    }));
    // Use setTimeout to avoid synchronous state update in effect
    setTimeout(() => setParticlePositions(positions), 0);
  }, []);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Instagram-style Header */}
      <MobileHeader onFollowClick={handleInstagramClick} />
      
      {/* Stories Row */}
      <StoriesRow activeStory={activeStory} setActiveStory={setActiveStory} />
      
      {/* Main Content */}
      <div className="pb-20">
        <HeroSection onFollowClick={handleInstagramClick} particlePositions={particlePositions} />
        <AboutSection />
        <MissionSection />
        <WhySection />
        <CTASection onFollowClick={handleInstagramClick} />
      </div>

      {/* Instagram-style Bottom Navigation */}
      <MobileNavigation onProfileClick={handleInstagramClick} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isScrolling && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-24 right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center z-50 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Story Viewer */}
      <AnimatePresence>
        {activeStory !== null && (
          <StoryViewer 
            activeStory={activeStory} 
            setActiveStory={setActiveStory} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile Header Component with Logo
function MobileHeader({ onFollowClick }: { onFollowClick: () => void }) {
  return (
    <motion.header 
      className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800 px-4 py-3"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gradient-to-r from-purple-500 to-pink-600"
          >
            <Image
              src="/insta.png"
              alt="Millions Move Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
          <motion.h1 
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Millions Move
          </motion.h1>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onFollowClick}
          className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Follow
        </motion.button>
      </div>
    </motion.header>
  );
}

// Stories Row Component
function StoriesRow({ activeStory, setActiveStory }: { activeStory: number | null; setActiveStory: (id: number | null) => void }) {
  const stories = [
    { id: 1, emoji: '🚀', title: 'Mission', color: 'from-blue-500 to-cyan-500' },
    { id: 2, emoji: '💪', title: 'Mindset', color: 'from-green-500 to-blue-500' },
    { id: 3, emoji: '⚡', title: 'Action', color: 'from-yellow-500 to-orange-500' },
    { id: 4, emoji: '🎯', title: 'Goals', color: 'from-purple-500 to-pink-500' },
    { id: 5, emoji: '🔥', title: 'Daily', color: 'from-red-500 to-orange-500' },
  ];

  return (
    <motion.div 
      className="flex space-x-4 px-4 py-3 overflow-x-auto scrollbar-hide bg-black border-b border-gray-800"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          className="flex flex-col items-center space-y-1.5 flex-shrink-0"
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveStory(story.id)}
        >
          <div className={`w-16 h-16 bg-gradient-to-r ${story.color} rounded-full flex items-center justify-center p-0.5`}>
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <span className="text-xl">{story.emoji}</span>
            </div>
          </div>
          <span className="text-xs text-gray-300">{story.title}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Story Viewer Component
function StoryViewer({ activeStory, setActiveStory }: { activeStory: number | null; setActiveStory: (id: number | null) => void }) {
  const stories = {
    1: { emoji: '🚀', title: 'Our Mission', content: 'Inspiring millions to take action and design lives they love.' },
    2: { emoji: '💪', title: 'Mindset Matters', content: 'Discipline over motivation. Action over excuses.' },
    3: { emoji: '⚡', title: 'Take Action', content: 'Small steps every day lead to massive results.' },
    4: { emoji: '🎯', title: 'Set Goals', content: 'Dream big, start small, act now.' },
    5: { emoji: '🔥', title: 'Daily Routine', content: 'Consistency is the key to unlocking potential.' },
  };

  const story = activeStory ? stories[activeStory as keyof typeof stories] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={() => setActiveStory(null)}
    >
      {story && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 mx-4 border border-gray-800 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {story.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-white">{story.title}</h3>
          <p className="text-gray-300 text-lg mb-6">{story.content}</p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold"
            onClick={() => setActiveStory(null)}
          >
            Close
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Mobile Navigation Component with Lucide Icons
function MobileNavigation({ onProfileClick }: { onProfileClick: () => void }) {
  const navItems = [
    { icon: House, label: 'House' },
    { icon: Search, label: 'Explore' },
    { icon: PlaySquare, label: 'Reels' },
    { icon: Heart, label: 'Activity' },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 px-6 py-3 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className="flex flex-col items-center space-y-1"
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <item.icon size={20} className="text-gray-300" />
            <span className="text-xs text-gray-400">{item.label}</span>
          </motion.button>
        ))}
        
        {/* Profile Button with Instagram Link */}
        <motion.button
          className="flex flex-col items-center space-y-1"
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onProfileClick}
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white">
            <Image
              src="/insta.png"
              alt="Profile"
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-400">Profile</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}

// Enhanced Hero Section for Mobile with Instagram Link
function HeroSection({ onFollowClick, particlePositions }: { onFollowClick: () => void; particlePositions: Array<{x: string, y: string}> }) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            initial={{ 
              x: position.x,
              y: position.y,
              opacity: 0
            }}
            animate={{ 
              y: [parseInt(position.y), parseInt(position.y) - 100, parseInt(position.y)],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 2),
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo Image */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-600 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src="/insta.png"
                alt="Millions Move Logo"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Millions
          <motion.span
            className="block text-white"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Move
          </motion.span>
        </motion.h1>
        
        <motion.p
          className="text-lg mb-8 text-gray-300 leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Move with purpose.<br />
          Grow with discipline.<br />
          Become unstoppable.
        </motion.p>

        <motion.div
          className="flex gap-3 justify-center flex-wrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onFollowClick}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-sm flex items-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <span>Follow on Instagram</span>
            <span>📱</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onFollowClick}
            className="px-6 py-3 border border-gray-600 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors flex items-center space-x-2"
          >
            <span>Watch Reels</span>
            <span>🎬</span>
          </motion.button>
        </motion.div>

        {/* Instagram-style Metrics */}
        <motion.div
          className="flex justify-center space-x-8 mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <div className="font-bold text-white">1.2M</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div>
            <div className="font-bold text-white">456</div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
          <div>
            <div className="font-bold text-white">89K</div>
            <div className="text-xs text-gray-400">Engagement</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-3xl mb-4">🖋</div>
          <h2 className="text-3xl font-bold mb-4">About Millions Move</h2>
        </motion.div>

        <div className="space-y-4 text-gray-300">
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Millions Move is more than a page — it&apos;s a <span className="text-blue-400 font-semibold">mindset</span>.
          </motion.p>
          
          <motion.p
            className="leading-relaxed"
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            In a world where people talk more and act less, we believe in <span className="text-green-400">movement over motivation</span>.
          </motion.p>

          <motion.div
            className="bg-white/5 rounded-2xl p-6 my-6 border border-white/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-center text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              ✨ Small steps. Big moves. Millions inspired.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Mission Section Component
function MissionSection() {
  const missions = [
    { icon: "🧠", title: "Mindset", desc: "think bigger", color: "from-blue-400 to-cyan-400" },
    { icon: "🚶‍♂️", title: "Movement", desc: "take action", color: "from-green-400 to-emerald-400" },
    { icon: "⚡", title: "Momentum", desc: "stay consistent", color: "from-yellow-400 to-orange-400" },
  ];

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-lg mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-3xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300">
            Inspire millions to break limits and design lives they love.
          </p>
        </motion.div>

        <div className="space-y-4">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              className={`p-4 rounded-2xl bg-gradient-to-r ${mission.color} bg-opacity-10 border border-white/20`}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{mission.icon}</div>
                <div>
                  <h3 className="font-bold text-white">{mission.title}</h3>
                  <p className="text-gray-300 text-sm">{mission.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8 p-4 bg-red-500/10 rounded-2xl border border-red-500/20"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-semibold text-red-400">
            Because motivation fades. Discipline wins.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Why Section Component
function WhySection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-lg mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-3xl mb-4">💡</div>
          <h2 className="text-3xl font-bold mb-4">Why Millions Move?</h2>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-400 mb-4">Two types of people:</h3>
          </motion.div>

          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
              <h4 className="text-lg font-bold text-red-400 mb-2">Those who dream.</h4>
              <p className="text-gray-300 text-sm">Waiting for perfect moments</p>
            </div>

            <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
              <h4 className="text-lg font-bold text-green-400 mb-2">Those who move.</h4>
              <p className="text-gray-300 text-sm">Creating their moments</p>
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg text-gray-300 mb-4">
              We choose action — even when it&apos;s hard.
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Ready to move? You&apos;re in the right place.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Enhanced CTA Section for Mobile with Instagram Link
function CTASection({ onFollowClick }: { onFollowClick: () => void }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        >
          Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Transform</span>?
        </motion.h2>

        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xl text-gray-300">Follow us.</p>
          <p className="text-lg italic text-gray-400">Not for entertainment.</p>
          <p className="text-2xl font-bold text-white">But for transformation.</p>
        </motion.div>

        <motion.button
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-bold text-lg mb-6 shadow-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onFollowClick}
        >
          👉 Follow @millions.move on Instagram
        </motion.button>

        <motion.div
          className="text-center space-y-2 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-green-400 text-xl font-semibold">Move today.</p>
          <p className="text-blue-400 text-xl font-semibold">Thank yourself tomorrow.</p>
        </motion.div>

        {/* Next Reel Preview */}
        <motion.div
          className="bg-black/50 rounded-2xl p-6 border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-gray-400 mb-3">🎬 Coming Next Reel:</p>
          <p className="text-lg font-semibold text-white mb-2">
            &quot;The 5 AM Routine That Changed Everything&quot;
          </p>
          <p className="text-gray-400 text-sm">Blueprint to mastering your mornings!</p>
          <motion.div
            className="flex items-center justify-center space-x-2 mt-3 text-yellow-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>🔥</span>
            <span className="text-sm">Don&apos;t Miss It!</span>
            <span>🔥</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}