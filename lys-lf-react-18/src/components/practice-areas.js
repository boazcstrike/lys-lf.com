import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faBriefcase,
  faCopyright,
  faGavel,
  faUsers,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons"

function PracticeAreas() {
  library.add(faBriefcase, faCopyright, faGavel, faUsers, faHandHoldingUsd)
  return (
    <div className="practice-areas-container flex flex-col items-center">
      <h2 className="practice-areas-text">Practice Areas</h2>
      <div className="flex flex-col">
        <div className="flex items-center pa-item">
          <div className="icon-container">
            <FontAwesomeIcon icon={faBriefcase} size="lg" />
          </div>
          <h4>
            <span>C</span>orporate
          </h4>
        </div>

        <div className="flex items-center pa-item">
          <div className="icon-container">
            <FontAwesomeIcon icon={faCopyright} size="lg" />
          </div>
          <h4>
            <span>I</span>ntellectual Property
          </h4>
        </div>

        <div className="flex items-center pa-item">
          <div className="icon-container">
            <FontAwesomeIcon icon={faGavel} size="lg" />
          </div>
          <h4>
            <span>L</span>abor
          </h4>
        </div>

        <div className="flex items-center pa-item">
          <div className="icon-container">
            <FontAwesomeIcon icon={faUsers} size="lg" />
          </div>
          <h4>
            <span>C</span>ivil and Criminal Litigation
          </h4>
        </div>

        <div className="flex items-center pa-item">
          <div className="icon-container">
            <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" />
          </div>
          <h4>
            <span>T</span>ax
          </h4>
        </div>
      </div>
    </div>
  )
}

export default PracticeAreas
