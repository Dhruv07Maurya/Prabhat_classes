"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const policies = [
  {
    title: "Attendance & Punctuality",
    content:
      "Undivided, regular class attendance tracking is mandatory. Every single unexcused absence triggers immediate parental notification loops. Students must maintain a minimum 85% attendance to be eligible for examinations. Medical leaves require proper documentation within 48 hours of absence.",
  },
  {
    title: "Code of Conduct",
    content:
      "Absolute mutual respect between peers, mentors, and office staff is non-negotiable to secure a pristine study cell environment. Mobile phones must be switched off during class hours. Any form of misbehavior or disturbance will result in disciplinary action and possible suspension.",
  },
  {
    title: "Continuous Assessments",
    content:
      "Weekly tests are structural prerequisites. Absence from mock papers requires formal rescheduling and progress evaluation review triggers. All assessments follow board examination patterns. Results are shared with parents within 3 working days of the test.",
  },
  {
    title: "Fee Payment Schedule",
    content:
      "Fees are payable monthly in advance by the 5th of each month. Late payment attracts a nominal penalty. Fee receipts must be preserved for future reference. Refund requests are processed as per the institute's refund policy available at the office.",
  },
  {
    title: "Safety & Security Protocols",
    content:
      "Students must carry their ID cards at all times within the premises. Parents/guardians must provide verified contact details. Pickup authorization for minors requires pre-registration. CCTV monitoring is in place for student safety.",
  },
]

export function PoliciesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="policies" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Header */}
          <div className="lg:col-span-1">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              02 / Guidelines
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-950 mt-4 mb-6">
              Our Structural Guidelines & Policies
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Excellence requires discipline. Our policies are strictly enforced to maintain a highly focused, professional environment conducive to rigorous learning.
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {policies.map((policy, index) => (
                <div key={index}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-5 flex items-center justify-between text-left group"
                  >
                    <span className="font-bold text-zinc-950 group-hover:text-red-600 transition-colors">
                      {policy.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-zinc-600 leading-relaxed pr-8">
                      {policy.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
