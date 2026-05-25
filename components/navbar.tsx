"use client"

import { Button } from "@/components/ui/button"
import { FloatingDock } from "@/components/ui/floating-dock"

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
  onBookDemo?: () => void
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "programs", label: "Divisions" },
  { id: "batches", label: "Batches" },
  { id: "toppers", label: "Fame" },
  { id: "faculty", label: "Faculty" },
  { id: "student-life", label: "Life" },
  { id: "contact", label: "Contact" },
]

const desktopNavItems = [
  { id: "home", label: "Home" },
  { id: "programs", label: "Academic Divisions" },
  { id: "batches", label: "Explore Batches" },
  { id: "toppers", label: "Wall of Fame" },
  { id: "faculty", label: "Our Faculty" },
  { id: "student-life", label: "Student Life" },
  { id: "contact", label: "Contact" },
]

// Inline SVG icons — no external dependencies
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)
const DivisionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)
const BatchesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)
const FameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)
const FacultyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)
const LifeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)
const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeIcon />,
  programs: <DivisionsIcon />,
  batches: <BatchesIcon />,
  toppers: <FameIcon />,
  faculty: <FacultyIcon />,
  "student-life": <LifeIcon />,
  contact: <ContactIcon />,
}

export function Navbar({ activeSection, onNavigate, onBookDemo }: NavbarProps) {
  // Build dock items — each a button that calls onNavigate
  const dockItems = navItems.map((item) => ({
    title: item.label,
    icon: iconMap[item.id],
    href: `#${item.id}`,
    active: activeSection === item.id,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault()
      onNavigate(item.id)
    },
  }))

  return (
    <>
      {/* ── TOP HEADER ────────────────────────────────────── */}
      <header className="sticky top-[37px] z-50 bg-white border-b border-zinc-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
              <img 
                src="/images/prabhat_logo.png" 
                alt="Prabhat Classes" 
                className="h-12 md:h-14 w-auto object-contain py-1"
              />
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1 px-3">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 text-xs font-semibold border transition-all duration-200 whitespace-nowrap ${
                    activeSection === item.id
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-zinc-300 text-zinc-700 hover:border-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA — always visible on md+, hidden on mobile (dock covers it) */}
            <div className="hidden md:block">
              <Button
                onClick={onBookDemo}
                className="bg-red-600 text-white px-5 py-2 text-xs font-bold hover:bg-red-700 transition-colors duration-200 rounded-none"
              >
                BOOK FREE DEMO
              </Button>
            </div>

            {/* Mobile right-side: small "Book Demo" pill */}
            <div className="md:hidden">
              <button
                onClick={onBookDemo}
                className="bg-red-600 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded"
              >
                Book Demo
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── MOBILE BOTTOM DOCK (Instagram-style) ─────────── */}
      <FloatingDock items={dockItems} />

      {/* Spacer so content isn't hidden behind the dock on mobile */}
      <div className="h-[62px] md:hidden" aria-hidden />
    </>
  )
}
