"use client"

import { useState } from "react"
import { Check, BookOpen, Calculator, TrendingUp, Brain, Target, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const secondaryFeatures = [
  {
    icon: Brain,
    title: "Conceptual Science Foundation",
    description: "Deep understanding of Physics, Chemistry, and Biology with practical applications and experiments.",
  },
  {
    icon: Calculator,
    title: "Mathematics Deep Dives",
    description: "Problem-solving techniques and formula mastery for Algebra, Geometry, and advanced topics.",
  },
  {
    icon: Target,
    title: "Regular Diagnostic Tests",
    description: "Weekly assessments to track progress and identify areas needing improvement.",
  },
  {
    icon: TrendingUp,
    title: "Mental Progress Tracking",
    description: "Personalized attention to each student's learning curve and mental preparedness.",
  },
]

const commerceFeatures = [
  {
    icon: BookOpen,
    title: "Advanced Accountancy Modules",
    description: "Complete mastery of partnership accounts, company accounts, and financial statements.",
    badge: "Specialists",
  },
  {
    icon: TrendingUp,
    title: "Economics Mastery Matrix",
    description: "Comprehensive coverage of Micro and Macro economics with real-world case studies.",
    badge: "Specialists",
  },
  {
    icon: Calculator,
    title: "Business Studies Excellence",
    description: "Strategic understanding of management principles, marketing, and business environment.",
    badge: "Specialists",
  },
  {
    icon: Award,
    title: "Commerce Scoring Strategies",
    description: "Exam-oriented preparation with model answers and presentation techniques.",
    badge: "Specialists",
  },
]

export function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<"secondary" | "commerce">("secondary")

  const secondaryBatches = [
    {
      title: "Evening Foundation Batch",
      timing: "06:00 PM to 09:00 PM Daily",
      description: "Secondary School (Class IX & X)",
      subjects: ["Mathematics", "English", "History", "Geography", "Hindi", "Marathi"]
    }
  ]

  const commerceBatches = [
    {
      title: "Morning Batch (Hindi Medium)",
      timing: "08:00 AM to 11:00 AM Daily",
      description: "Batch A - Vernacular Medium Specialized",
      subjects: ["Advanced Accountancy", "Economics", "Business Studies", "Hindi", "Marathi"]
    },
    {
      title: "Afternoon Batch (English Medium)",
      timing: "02:00 PM to 05:00 PM Daily",
      description: "Batch B - English Medium Commerce/Accounts",
      subjects: ["Advanced Accountancy", "Commerce Strategy", "Economics Matrix", "English", "Electives"]
    }
  ]

  const batches = activeTab === "secondary" ? secondaryBatches : commerceBatches

  return (
    <section id="programs" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">01 / Academic Divisions</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 mb-4 uppercase">
            Choose Your Academic<br />Division
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
            Comprehensive Timetable & Curriculum Maps tailored for maximum board exam success and personalized mentorship.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => setActiveTab("secondary")}
            className={`relative px-8 py-6 text-left transition-all duration-300 border-2 flex-1 ${
              activeTab === "secondary"
                ? "bg-zinc-950 text-white border-zinc-950"
                : "bg-white text-zinc-950 border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <span className={`block text-xs uppercase tracking-widest mb-2 ${activeTab === "secondary" ? "text-red-400" : "text-red-600"}`}>
              Classes IX & X
            </span>
            <span className="text-xl font-black">Secondary School Division</span>
            {activeTab === "secondary" && (
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("commerce")}
            className={`relative px-8 py-6 text-left transition-all duration-300 border-2 flex-1 ${
              activeTab === "commerce"
                ? "bg-zinc-950 text-white border-zinc-950"
                : "bg-white text-zinc-950 border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <span className={`block text-xs uppercase tracking-widest mb-2 ${activeTab === "commerce" ? "text-red-400" : "text-red-600"}`}>
              Classes XI & XII
            </span>
            <span className="text-xl font-black">Senior Commerce Division</span>
            {activeTab === "commerce" && (
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Batch Details */}
        {batches.map((batch, batchIndex) => (
          <div key={batchIndex} className="mb-12">
            <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-xl mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-black text-zinc-950 mb-2">{batch.title}</h3>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{batch.description}</p>
                </div>
                <div className="bg-red-600 text-white px-6 py-4 font-bold text-sm whitespace-nowrap">
                  <p className="font-semibold">{batch.timing}</p>
                </div>
              </div>

              {/* Curriculum Badges */}
              <div className="flex flex-wrap gap-3">
                {batch.subjects.map((subject, idx) => (
                  <div key={idx} className="px-4 py-2 bg-white border border-zinc-300 rounded-full text-xs font-bold text-zinc-950 uppercase tracking-wider hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {(activeTab === "secondary" ? secondaryFeatures : commerceFeatures).map(
            (feature, index) => (
              <div
                key={index}
                className="group p-6 bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:bg-white transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                    <feature.icon className="w-6 h-6 text-zinc-700 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-zinc-950">{feature.title}</h3>
                      {"badge" in feature && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-600 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Class List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-8 bg-zinc-950 text-white">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">
              {activeTab === "secondary" ? "Secondary School Classes" : "Commerce Stream Classes"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeTab === "secondary" ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Class IX</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Class X Board</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Foundation Prep</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Class XI Commerce</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Class XII Board</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">CA Foundation</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA Card */}
          <div className="p-8 bg-red-600 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black mb-3">Ready to Join?</h3>
              <p className="text-red-100 text-sm">
                Limited seats available for the upcoming batch. Secure your spot today.
              </p>
            </div>
            <Button className="mt-6 bg-white text-red-600 hover:bg-zinc-100 rounded-none font-bold uppercase tracking-wide group">
              Enroll Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
