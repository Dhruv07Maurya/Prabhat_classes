'use client'

export function FacultySection() {
  return (
    <section id="faculty" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">Our Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-950 mb-4">The Minds Shaping the Scores</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">Experienced educators dedicated to student excellence and personalized mentorship.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Owner */}
          <div className="group">
            <div className="relative overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200 mb-6 aspect-square hover:border-red-600 transition-all duration-300">
              <img
                src="/images/owner.png"
                alt="Prof. Prabhat"
                className="w-full h-full object-cover object-[center_1%] grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950">Prof. Prabhat</h3>
            <p className="text-sm text-zinc-600">Founder & Director</p>
            <p className="text-xs text-zinc-500 mt-2">Senior Accounts Mentor with 15+ Years Board Expertise</p>
          </div>

          {/* Card 2: Placeholder */}
          <div className="group">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 border-dashed mb-6 aspect-square flex items-center justify-center hover:border-blue-500 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl text-zinc-300 mb-2">📊</div>
                <p className="text-xs text-zinc-400 font-medium">Mathematics Expert</p>
              </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-950">Faculty Member</h3>
            <p className="text-sm text-zinc-600">Core Mathematics Educator</p>
            <p className="text-xs text-zinc-500 mt-2">Specializing in advanced problem-solving techniques</p>
          </div>

          {/* Card 3: Placeholder */}
          <div className="group">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 border-dashed mb-6 aspect-square flex items-center justify-center hover:border-emerald-500 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl text-zinc-300 mb-2">📚</div>
                <p className="text-xs text-zinc-400 font-medium">Language Humanities</p>
              </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-950">Faculty Member</h3>
            <p className="text-sm text-zinc-600">Language & Humanities Lead</p>
            <p className="text-xs text-zinc-500 mt-2">Expertly crafting comprehensive language curriculum</p>
          </div>
        </div>
      </div>
    </section>
  )
}
