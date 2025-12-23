'use client'

import React from "react"

// only develop this when needed; in this case they dont really need it
// import ReactGA from "react-ga4"

import Header from "@/app/components/header"
import PracticeAreas from "@/app/components/practice-areas"
import BusinessProfile from "@/app/components/business-profile"
import Team from "@/app/components/team"
import MiniShowcase from "@/app/components/mini-showcase"
import Contact from "@/app/components/contacts"
import Footer from "@/app/components/footer"

import practiceAreas from "@/app/assets/data/practice-areas"

/**
 * Home page component
 * Main landing page that displays all sections of the law firm website
 *
 * @returns The home page JSX
 */
function App(): React.ReactNode {
  // if (process.env.NODE_ENV === "production") {
  // ReactGA.initialize([
    // {
      // trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
    // },
  // ])
  // ReactGA.send({ hitType: "pageview", page: "/", title: "Page Visit" })
  // }

  return (
    <div className="App">
      <link rel="shortcut icon" href="/images/myfavicon.ico"></link>
      <Header />
      <PracticeAreas practiceAreas={practiceAreas} />
      <BusinessProfile />
      <Team />
      <MiniShowcase text="Have Legal Problems? Let's Talk." />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
