import React from "react"
import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"

import SectionTitle from "@/app/components/section-title"
import type { PracticeArea } from "@/app/types"

interface PracticeAreasProps {
  practiceAreas: PracticeArea[]
}

const iconMap: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

const FallbackIcon = FaGavel

const PracticeAreas = ({ practiceAreas }: PracticeAreasProps): React.ReactNode => {
  return (
    <div className="pt-15 pb-25 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <SectionTitle title="Practice Areas" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {practiceAreas.map((area, index) => {
            const IconComponent = iconMap[area.icon] ?? FallbackIcon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-zinc-200 hover:-translate-y-2 w-full max-w-sm"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-700 rounded-2xl group-hover:from-zinc-700 group-hover:to-zinc-800 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-white" aria-hidden={true} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-zinc-700 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">{area.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(PracticeAreas)
