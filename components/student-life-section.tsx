'use client'

import { Pause, Play } from 'lucide-react'
import { useState, useRef } from 'react'
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card'

export function StudentLifeSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Draggable gallery items
  const galleryItems = [
    { id: 1, title: 'Class Celebrations', image: '/images/WhatsApp Image 2026-05-25 at 2.18.11 AM.jpeg', className: 'absolute top-8 left-[5%] rotate-[-5deg]', color: 'from-red-500 to-red-600' },
    { id: 2, title: 'Award Ceremonies', image: '/images/WhatsApp Image 2026-05-25 at 2.18.11 AM.jpeg', className: 'absolute top-32 left-[15%] rotate-[-7deg]', color: 'from-amber-500 to-amber-600' },
    { id: 3, title: 'Cultural Events', image: '/images/WhatsApp Image 2026-05-25 at 2.18.11 AM (1).jpeg', className: 'absolute top-4 left-[30%] rotate-[8deg]', color: 'from-emerald-500 to-emerald-600' },
    { id: 4, title: 'Study Sessions', image: '/images/WhatsApp Image 2026-05-24 at 10.32.24 AM.jpeg', className: 'absolute top-24 left-[45%] rotate-[5deg]', color: 'from-blue-500 to-blue-600' },
    { id: 5, title: 'Group Activities', image: '/images/WhatsApp Image 2026-05-25 at 2.18.11 AM.jpeg', className: 'absolute top-16 right-[25%] rotate-[2deg]', color: 'from-purple-500 to-purple-600' },
    { id: 6, title: 'Excellence Moments', image: '/images/WhatsApp Image 2026-05-25 at 2.18.11 AM.jpeg', className: 'absolute top-8 right-[10%] rotate-[-4deg]', color: 'from-pink-500 to-pink-600' },
  ]

  return (
    <section id="student-life" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">05 / Student Experience</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 mb-4 uppercase">
            Fun Life of Students
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
            Beyond academics: celebrate the vibrant culture, festivals, achievements, and memorable moments that define the Prabhat experience.
          </p>
        </div>

        {/* Info Card + Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Info Card */}
          <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-xl">
            <h3 className="text-lg font-black text-zinc-950 mb-6 uppercase">Student Life Highlights</h3>
            <div className="space-y-4 text-sm text-zinc-600">
              <div>
                <p className="font-semibold text-zinc-950 mb-1">Engagement</p>
                <p>Active participation in extracurricular activities ensures holistic development.</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-950 mb-1">Community</p>
                <p>Strong bonds between students and faculty create a supportive learning environment.</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-950 mb-1">Growth</p>
                <p>Personal and academic growth through mentorship and collaborative learning.</p>
              </div>
            </div>
          </div>

          {/* Video Player - 2 cols */}
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-video bg-zinc-950 rounded-xl overflow-hidden group">
              <video
                ref={videoRef}
                src="/videos/prabhat_classes.mp4"
                className="w-full h-full object-cover"
                loop
              />
              
              {/* Play Button Overlay */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-zinc-950/30 group-hover:bg-zinc-950/50 transition-colors duration-300 z-10"
              >
                <div className={`w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transition-transform duration-300 ${
                  isPlaying ? 'scale-90 opacity-75' : 'scale-100 group-hover:scale-110'
                }`}>
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white ml-0.5" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1" />
                  )}
                </div>
              </button>

              {/* Playback Bar */}
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Draggable Activity Gallery */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-zinc-950 mb-4 uppercase">Activity Gallery</h3>
          <p className="text-zinc-500 text-sm mb-8">Drag the cards around to explore our student activities</p>
          
          <DraggableCardContainer className="relative min-h-[400px] w-full bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-2xl border-2 border-dashed border-zinc-200 overflow-hidden">
            {/* Center Text */}
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl md:text-2xl font-black text-zinc-300 max-w-xs pointer-events-none z-0">
              Drag cards to explore student life moments
            </p>
            
            {/* Draggable Cards */}
            {galleryItems.map((item) => (
              <DraggableCardBody key={item.id} className={item.className}>
                <div className={`w-36 h-44 md:w-44 md:h-52 bg-gradient-to-br ${item.color} rounded-xl shadow-lg flex flex-col items-center justify-center p-3 border-4 border-white cursor-grab active:cursor-grabbing`}>
                  <div className="w-full h-28 md:h-36 bg-zinc-950/10 rounded-lg mb-2 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </div>
                  {/* <h4 className="text-white text-xs md:text-sm font-bold text-center uppercase tracking-wide truncate w-full">
                    {item.title}
                  </h4> */}
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>

        {/* Fun Facts */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-black text-red-600 mb-2">500+</p>
              <p className="text-sm text-zinc-600 uppercase tracking-wide">Active Students</p>
            </div>
            <div className="text-center border-l border-r border-zinc-200">
              <p className="text-4xl font-black text-emerald-600 mb-2">50+</p>
              <p className="text-sm text-zinc-600 uppercase tracking-wide">Annual Events</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-blue-600 mb-2">100%</p>
              <p className="text-sm text-zinc-600 uppercase tracking-wide">Engagement Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
