'use client'

import React from "react"

// only develop this when needed; in this case they dont really need it
// import ReactGA from "react-ga4"

import Header from "@/components/header"
import PracticeAreas from "@/components/practice-areas"
import BusinessProfile from "@/components/business-profile"
import Team from "@/components/team"
import MiniShowcase from "@/components/mini-showcase"
import Contact from "@/components/contacts"
import Footer from "@/components/footer"

import practiceAreas from "@/data/practice-areas"


function App() {
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
