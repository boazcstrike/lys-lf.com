import React, { useEffect, useState } from "react"

import ReactGA from "react-ga4"

import lysLogo from "../../public/images/lys-white-logo-darker.png"

import Header from "../components/header"
import PracticeAreas from "../components/practice-areas"
import Map from "../components/map"
import BusinessProfile from "../components/business-profile"
import Team from "../components/team"
import MiniShowcase from "../components/mini-showcase"
import Contact from "../components/contacts"
import Footer from "../components/footer"

function App() {
  // if (process.env.NODE_ENV === "production") {
  ReactGA.initialize([
    {
      trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
    },
  ])
  ReactGA.send({ hitType: "pageview", page: "/", title: "Page Visit" })
  // }

  return (
    <div className="App">
      <link rel="shortcut icon" href="/images/myfavicon.ico"></link>
      <Header />
      <PracticeAreas />
      <BusinessProfile />
      <Team />
      <MiniShowcase text="Have Legal Problems? Let's Talk." />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
