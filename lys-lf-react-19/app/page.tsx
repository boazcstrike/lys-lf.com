import React from "react"

import Header from "@/app/components/header"
import PracticeAreas from "@/app/components/practice-areas"
import BusinessProfile from "@/app/components/business-profile"
import Team from "@/app/components/team"
import MiniShowcase from "@/app/components/mini-showcase"
import Contacts from "@/app/components/contacts"
import Footer from "@/app/components/footer"

import practiceAreas from "@/app/assets/data/practice-areas"

function App(): React.ReactNode {
  return (
    <div className="App">
      <Header />
      <PracticeAreas practiceAreas={practiceAreas} />
      <BusinessProfile />
      <Team />
      <MiniShowcase text="Have Legal Problems? Let's Talk." />
      <Contacts />
      <Footer />
    </div>
  )
}

export default App
