import { FC } from "react"

/**
 * BusinessProfile component - displays firm's company profile and history
 * 
 * Shows:
 * - Firm establishment year and focus areas
 * - Partner information and credentials
 * - Core values and philosophy
 * - Firm's vision
 * 
 * @component
 * @returns {React.ReactNode} Business profile section
 */
const BusinessProfile: FC = () => {
  return (
    <div className="bg-[url('/images/zwartevilt_@2X.jpg')] bg-left-top bg-repeat px-8 py-20">
      <div className="flex flex-col items-center">
        <h2 className="uppercase tracking-wider font-bold text-[1.45em] max-w-[15em] mb-6 px-2 py-2 border-t border-b border-white text-white text-center font-serif">
          Business Profile
        </h2>

        <div className="pb-8 space-y-6 max-w-[42em] text-white text-justify text-[1.2em] leading-relaxed indent-[2.5em]">
          <p>
            The Lim & Yutatco-Sze Law Firm (LYS) is a full-service law office
            established in 2015. It is engaged in diversified practice of law
            primarily focusing in corporate, labor and and tax laws. The Firm
            likewise represents both corporate and individual clients in
            different courts and administrative agencies in the country.
          </p>

           <p>
             The partners and lawyers of LYS are graduates of one of the
             country&apos;s reputable law schools. LYS&apos;s founding partners,{" "}
             <b>Mr. Juanito R. Lim, Jr.</b> and <b>Ms. Gloriosa Yutatco-Sze</b>,
            received their law degrees from the San Beda University - College of
            Law in Mendiola, Manila (formerly San Beda College). Apart from
            being lawyers, Mr. Lim is a registered civil engineer while Ms.
            Yutatco-Sze is a certified public accountant.
          </p>

          <p>
             As a group of skilled and dedicated legal experts, LYS understands
             the importance of professional excellence and teamwork. These are
             the core values by which LYS equips itself as it responds to the
             ever growing demands of its clients. Each member of the Firm
             understands the significance of delivering clients&apos; demands in the
             most economically and time-efficient means. As result-oriented
             professionals, LYS delivers its clients&apos; legal requirements
             expediently.
          </p>

           <p>
             In view of the Philippines&apos; undaunted economic growth, LYS prepares
             itself through continuous and extensive trainings in various fields
             of law. To this end, members of LYS are required to undergo
             different seminars and trainings relevant to Firm&apos;s diversified
             fields of practice.
          </p>

           <p>
             <b>LYS</b> envisions itself to be one of the Philippines&apos; dynamic
             and progressive law firms.
           </p>
        </div>
      </div>
    </div>
  )
}

export default BusinessProfile
