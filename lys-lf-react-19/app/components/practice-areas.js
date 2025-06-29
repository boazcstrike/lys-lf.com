import * as FaIcons from "react-icons/fa"

function PracticeAreas({ practiceAreas }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-8xl font-bold text-slate-800 mb-2 tracking-tight">Practice Areas</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-zinc-600 to-zinc-800 mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-6 text-lg max-w-2xl mx-auto">
            Comprehensive legal services tailored to meet your specific needs
          </p>
        </div>

        {/* Option 1: Centered layout for better balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {practiceAreas.map((area, index) => {
            const IconComponent = FaIcons[area.icon]
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-zinc-200 hover:-translate-y-2 w-full max-w-sm"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-700 rounded-2xl mb-6 group-hover:from-zinc-700 group-hover:to-zinc-800 transition-all duration-300 group-hover:scale-110">
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-zinc-700 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">{area.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Alternative: Masonry-style layout */}
        <div className="hidden">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {practiceAreas.map((area, index) => {
              const IconComponent = FaIcons[area.icon]
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-zinc-200 hover:-translate-y-2 break-inside-avoid"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-zinc-600 to-zinc-700 rounded-xl flex items-center justify-center group-hover:from-zinc-700 group-hover:to-zinc-800 transition-all duration-300">
                        {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-zinc-700 transition-colors duration-300">
                        {area.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PracticeAreas
