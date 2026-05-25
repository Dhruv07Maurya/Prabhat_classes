'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Info } from 'lucide-react'

interface SubTopic {
  id: string
  label: string
}

interface Branch {
  id: string
  label: string
  subTopics?: SubTopic[]
}

interface TreeData {
  root: string
  branches: Branch[]
}

const batchesTree: TreeData = {
  root: 'Prabhat Coaching Classes',
  branches: [
    {
      id: 'intro',
      label: 'School Foundation (IX & X)',
      subTopics: [
        { id: 'intro-1', label: 'Mathematics: Algebra & Geometry Mastery' },
        { id: 'intro-2', label: 'Science: Physics, Chemistry & Biology Basics' },
        { id: 'intro-3', label: 'Languages: English, Hindi & Marathi Literature' },
        { id: 'intro-4', label: 'Social Studies: History, Geography & Civics Prep' },
      ]
    },
    {
      id: 'global',
      label: 'Commerce Foundation (XI)',
      subTopics: [
        { id: 'glob-1', label: 'Book Keeping & Accountancy Fundamentals' },
        { id: 'glob-2', label: 'Economics & Basic Financial Concepts' },
        { id: 'glob-3', label: 'Organisation of Commerce (OCM) Intro' },
        { id: 'glob-4', label: 'Secretarial Practice (SP) / IT Modules' },
      ]
    },
    {
      id: 'ems',
      label: 'Commerce Board Prep (XII)',
      subTopics: [
        { id: 'ems-1', label: 'Advanced Accountancy: Balance Sheets & Partnership' },
        { id: 'ems-2', label: 'Economics: Micro & Macro Exam Patterns' },
        { id: 'ems-3', label: 'Organisation of Commerce & Corporate Studies' },
        { id: 'ems-4', label: 'Secretarial Practice (SP) & Board Prep' },
      ]
    },
    {
      id: 'leg',
      label: 'Accounts Specialization',
      subTopics: [
        { id: 'leg-1', label: 'Company Accounts & Share Capital Issues' },
        { id: 'leg-2', label: 'Financial Statement Analysis & Ratio Analysis' },
        { id: 'leg-3', label: 'Double-Entry Bookkeeping Advanced Workshops' },
      ]
    },
    {
      id: 'protocol',
      label: 'Mock Test Series',
      subTopics: [
        { id: 'prot-1', label: 'Weekly Chapter-wise Practice Exams' },
        { id: 'prot-2', label: 'Full-portion Prelims (3 Rounds of Testing)' },
        { id: 'prot-3', label: 'Board Exam Replica Atmosphere & Time Management' },
        { id: 'prot-4', label: 'Detailed Personal Paper Assessment & Corrections' },
      ]
    },
    {
      id: 'tqm',
      label: 'Doubt Solving Sessions',
      subTopics: [
        { id: 'tqm-1', label: 'Daily 1-on-1 Personal Doubt Resolution Desk' },
        { id: 'tqm-2', label: 'Weekend Group Revision & High-Yield Topics' },
        { id: 'tqm-3', label: 'Board Toppers Answer Writing Strategy Sessions' },
      ]
    },
    {
      id: 'social',
      label: 'Career Counseling',
      subTopics: [
        { id: 'soc-1', label: 'CA, CS, CMA Professional Guidance Pathways' },
        { id: 'soc-2', label: 'Top-tier Degree College Admission Advice' },
        { id: 'soc-3', label: 'Career Aptitude Mentorship & Goal Alignment' },
      ]
    },
  ]
}

export function ExploreBatchesTree() {
  const [isTreeExpanded, setIsTreeExpanded] = useState(true)
  const [expandedBranch, setExpandedBranch] = useState<string | null>('ems')
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [coords, setCoords] = useState<{
    root?: { x: number; y: number }
    branches: Record<string, { left: { x: number; y: number }; right: { x: number; y: number } }>
    subs: Record<string, { x: number; y: number }>
  }>({
    branches: {},
    subs: {},
  })

  const updateCoords = () => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()

    const getPoints = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return null
      const rect = el.getBoundingClientRect()
      return {
        left: {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
        },
        right: {
          x: rect.right - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
        },
      }
    }

    const rootPoints = getPoints('root-node')
    const branchesCoords: typeof coords.branches = {}
    const subsCoords: typeof coords.subs = {}

    if (isTreeExpanded) {
      batchesTree.branches.forEach((branch) => {
        const pts = getPoints(`branch-${branch.id}`)
        if (pts) {
          branchesCoords[branch.id] = pts
        }

        if (branch.subTopics && branch.id === expandedBranch) {
          branch.subTopics.forEach((sub) => {
            const subPts = getPoints(`sub-${sub.id}`)
            if (subPts) {
              subsCoords[sub.id] = subPts.left
            }
          })
        }
      })
    }

    setCoords({
      root: rootPoints?.right,
      branches: branchesCoords,
      subs: subsCoords,
    })
  }

  useEffect(() => {
    // Wait for the DOM rendering to settle and capture layout correctly
    const timer = setTimeout(() => {
      updateCoords()
    }, 100)

    window.addEventListener('resize', updateCoords)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateCoords)
    }
  }, [expandedBranch, isTreeExpanded])

  // Get Level 1 Junction
  const getLevel1Junction = () => {
    if (!coords.root) return null
    const rootRightX = coords.root.x
    const rootRightY = coords.root.y
    
    const branchIds = Object.keys(coords.branches)
    if (isTreeExpanded && branchIds.length > 0) {
      const firstBranchX = coords.branches[branchIds[0]].left.x
      const junctionX = rootRightX + (firstBranchX - rootRightX) / 2
      return { x: junctionX, y: rootRightY }
    }
    
    return { x: rootRightX + 40, y: rootRightY }
  }

  // Get Level 2 Junction
  const getLevel2Junction = () => {
    if (!expandedBranch || !coords.branches[expandedBranch]) return null
    const branchRight = coords.branches[expandedBranch].right
    
    const subIds = Object.keys(coords.subs)
    if (subIds.length > 0) {
      const firstSubX = coords.subs[subIds[0]].x
      const junctionX = branchRight.x + (firstSubX - branchRight.x) / 2
      return { x: junctionX, y: branchRight.y }
    }
    
    return { x: branchRight.x + 40, y: branchRight.y }
  }

  const lvl1Junction = getLevel1Junction()
  const lvl2Junction = getLevel2Junction()

  const branchCoords = expandedBranch ? coords.branches[expandedBranch] : null
  const subContainerStyle = branchCoords ? {
    position: 'absolute' as const,
    left: `${branchCoords.right.x + 80}px`,
    top: `${branchCoords.right.y}px`,
    transform: 'translateY(-50%)',
  } : {}

  return (
    <div className="w-full">
      {/* Helper message */}
      <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mb-4 bg-zinc-950/40 w-fit mx-auto px-3 py-1.5 rounded-full border border-zinc-900">
        <Info className="w-3.5 h-3.5 text-indigo-400" />
        <span>Click on the branches and chevrons to navigate the structures</span>
      </div>

      {/* Main Map Box */}
      <div className="w-full overflow-x-auto relative rounded-2xl bg-[#14151f] border border-zinc-800/80 p-8 shadow-inner select-none scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-800">
        <div 
          ref={containerRef}
          className="min-w-[1050px] flex items-center justify-start lg:justify-center gap-28 relative py-12 min-h-[580px] mx-auto transition-all duration-300"
        >
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
            {coords.root && lvl1Junction && (
              <path
                d={`M ${coords.root.x} ${coords.root.y} L ${lvl1Junction.x} ${lvl1Junction.y}`}
                fill="none"
                stroke="rgba(99, 102, 241, 0.45)"
                strokeWidth="2"
                className="transition-all duration-300"
              />
            )}

            {isTreeExpanded && lvl1Junction && Object.entries(coords.branches).map(([id, pts]) => {
              const endX = pts.left.x
              const endY = pts.left.y
              const offset = (endX - lvl1Junction.x) / 2
              const isActive = expandedBranch === id
              return (
                <path
                  key={`curve-1-${id}`}
                  d={`M ${lvl1Junction.x} ${lvl1Junction.y} C ${lvl1Junction.x + offset} ${lvl1Junction.y}, ${endX - offset} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke={isActive ? "rgba(99, 102, 241, 0.7)" : "rgba(113, 113, 122, 0.25)"}
                  strokeWidth={isActive ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
              )
            })}

            {expandedBranch && coords.branches[expandedBranch] && lvl2Junction && (
              <path
                d={`M ${coords.branches[expandedBranch].right.x} ${coords.branches[expandedBranch].right.y} L ${lvl2Junction.x} ${lvl2Junction.y}`}
                fill="none"
                stroke="rgba(16, 185, 129, 0.55)"
                strokeWidth="2"
                className="transition-all duration-300"
              />
            )}

            {expandedBranch && lvl2Junction && Object.entries(coords.subs).map(([id, pts]) => {
              const endX = pts.x
              const endY = pts.y
              const offset = (endX - lvl2Junction.x) / 2
              return (
                <path
                  key={`curve-2-${id}`}
                  d={`M ${lvl2Junction.x} ${lvl2Junction.y} C ${lvl2Junction.x + offset} ${lvl2Junction.y}, ${endX - offset} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.5)"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              )
            })}
          </svg>

          {/* Root Node */}
          <div className="flex-shrink-0 z-10">
            <div 
              id="root-node"
              className="bg-indigo-600/90 text-white px-6 py-4 rounded-xl font-bold text-sm tracking-wider uppercase border border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] select-none hover:bg-indigo-600 transition-all duration-300"
            >
              {batchesTree.root}
            </div>
          </div>

          {/* Level 1 Expand/Collapse Circle Button */}
          {lvl1Junction && (
            <button
              onClick={() => {
                setIsTreeExpanded(!isTreeExpanded)
                if (isTreeExpanded) {
                  setExpandedBranch(null)
                }
              }}
              style={{
                left: `${lvl1Junction.x}px`,
                top: `${lvl1Junction.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 w-6 h-6 rounded-full bg-zinc-800 hover:bg-indigo-600 border border-zinc-700 hover:border-indigo-400 flex items-center justify-center text-white cursor-pointer transition-all shadow-md group"
              title={isTreeExpanded ? "Collapse Branches" : "Expand Branches"}
            >
              {isTreeExpanded ? (
                <ChevronLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              )}
            </button>
          )}

          {/* Level 1 Nodes */}
          {isTreeExpanded && (
            <div className="flex flex-col gap-4 py-4 z-10 w-[260px]">
              {batchesTree.branches.map((branch) => {
                const isExpanded = expandedBranch === branch.id
                return (
                  <div
                    key={branch.id}
                    id={`branch-${branch.id}`}
                    onClick={() => {
                      if (branch.subTopics) {
                        setExpandedBranch(isExpanded ? null : branch.id)
                      }
                    }}
                    className={`flex items-center justify-between gap-3 px-5 py-3 rounded-xl text-xs font-semibold border transition-all duration-300 cursor-pointer select-none group ${
                      isExpanded
                        ? 'bg-zinc-800 text-white border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                        : 'bg-[#181a25] text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-[#202230]'
                    }`}
                  >
                    <span className="truncate">{branch.label}</span>
                    {branch.subTopics && (
                      <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isExpanded 
                          ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400' 
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-600'
                      }`}>
                        <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Level 2 Expand/Collapse Circle Button */}
          {expandedBranch && lvl2Junction && (
            <button
              onClick={() => setExpandedBranch(null)}
              style={{
                left: `${lvl2Junction.x}px`,
                top: `${lvl2Junction.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 w-6 h-6 rounded-full bg-zinc-800 hover:bg-emerald-600 border border-zinc-700 hover:border-emerald-400 flex items-center justify-center text-white cursor-pointer transition-all shadow-md group"
              title="Collapse Subtopics"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
            </button>
          )}

          {/* Level 2 Nodes Container */}
          {isTreeExpanded && expandedBranch && (
            <div 
              style={subContainerStyle}
              className="flex flex-col gap-3 py-2 z-10 transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 w-[300px]"
            >
              {batchesTree.branches.find(b => b.id === expandedBranch)?.subTopics?.map((sub) => (
                <div
                  key={sub.id}
                  id={`sub-${sub.id}`}
                  className="bg-[#112d1f]/95 text-emerald-100 px-4 py-2.5 rounded-lg border border-emerald-800/40 hover:bg-[#183d2a]/95 hover:border-emerald-700/60 transition-all duration-300 text-xs font-semibold shadow-sm select-none break-words"
                >
                  {sub.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Swipe/Scroll hint for small screens */}
      <div className="text-center mt-4 lg:hidden flex items-center justify-center gap-2 text-xs text-zinc-500">
        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span>Swipe horizontally to view full Batch Tree</span>
      </div>
    </div>
  )
}
