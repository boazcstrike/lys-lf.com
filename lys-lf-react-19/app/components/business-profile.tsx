import React, { FC } from "react"
import Markdown from "react-markdown"

import Reveal from "@/app/components/reveal"
import { businessProfile } from "@/app/assets/data/business-profile"

const BusinessProfile: FC = (): React.ReactNode => {
  return (
    <div className="bg-[url('/images/zwartevilt_@2X.jpg')] bg-left-top bg-repeat px-8 py-20">
      <div className="flex flex-col items-center">
        <Reveal
          as="h2"
          className="uppercase tracking-wider font-bold text-[1.45em] max-w-[15em] mb-6 px-2 py-2 border-t border-b border-white text-white text-center font-serif"
        >
          {businessProfile.title}
        </Reveal>

        <Reveal delay={90} className="pb-8 space-y-6 max-w-[42em] text-white text-justify text-[1.2em] leading-relaxed indent-[2.5em]">
          {businessProfile.paragraphs.map((paragraph, index) => (
            <Markdown
              key={index}
              components={{
                p: ({ children }): React.ReactNode => <p>{children}</p>,
                strong: ({ children }): React.ReactNode => <strong className="font-bold">{children}</strong>,
              }}
            >
              {paragraph}
            </Markdown>
          ))}
        </Reveal>
      </div>
    </div>
  )
}

export default React.memo(BusinessProfile)
