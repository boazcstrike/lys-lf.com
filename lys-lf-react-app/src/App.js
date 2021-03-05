import React, { useEffect } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactGA from 'react-ga';

import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faBriefcase,
  faCopyright,
  faGavel,
  faUsers,
  faHandHoldingUsd,
  faMobileAlt
} from '@fortawesome/free-solid-svg-icons'

import lysLogo from './images/lys-white-logo-darker.png';
import gloPic from './images/LYS-20.jpg'
import junPic from './images/LYS-21.jpg'

import './App.scss'
import './tailwind.scss'

import Profile from './components/profile'
import Map from './components/map'

if (process.env.NODE_ENV !== 'production') {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function App() {
  library.add(
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faClock,
    faBriefcase,
    faCopyright,
    faGavel,
    faUsers,
    faHandHoldingUsd,
    faMobileAlt)

  var random_boolean = Math.random() < 0.5;

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('ENV:')
      console.log(process.env.NODE_ENV)
      console.log(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)
      console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    }
  }, [])

  return (
    <div className="App">

      {random_boolean ?
        <div className="flex flex-col header-container-1 items-center content-center h-screen justify-center">
          <div className="header-wrapper">
            <img src={lysLogo} className="lys-landing-logo" alt="lys-landing-logo" />
            <h1 className="text-gray phone-text">
              <span>
                <FontAwesomeIcon icon="phone"></FontAwesomeIcon>
              </span>(02)8-293-8254
          </h1>
            <h2 className="text-white">
              The Lim <span className="text-gray">&</span> Yutatco-Sze Law Firm <span className="text-gray">(LYS)</span> is a full-service law office established in 2015.
          </h2>
            <h3 className="text-white">
              It is engaged in diversified practice of law primarily focusing in corporate, labor and and tax laws.

              The Firm likewise represents both corporate and individual clients

              in different courts and administrative agencies in the country.
          </h3>
          </div>
        </div>
        :
        <div className="flex flex-col header-container-2 items-center content-center h-screen justify-center">
          <div className="header-wrapper">
            <img src={lysLogo} className="lys-landing-logo" alt="lys-landing-logo" />
            <h1 className="text-gray phone-text">
              <span>
                <FontAwesomeIcon icon="phone"></FontAwesomeIcon>
              </span>(02)8-293-8254
          </h1>
            <h2 className="text-white">
              The Lim <span className="text-gray">&</span> Yutatco-Sze Law Firm <span className="text-gray">(LYS)</span> is a full-service law office established in 2015.
          </h2>
            <h3 className="text-white">
              It is engaged in diversified practice of law primarily focusing in corporate, labor and and tax laws.

              The Firm likewise represents both corporate and individual clients

              in different courts and administrative agencies in the country.
          </h3>
          </div>
        </div>
      }

      <div className="practice-areas-container flex flex-col items-center">
        <h2 className="practice-areas-text">Practice Areas</h2>
        <div className="flex flex-col">
          <div className="flex items-center pa-item">
            <div className="icon-container">
              <FontAwesomeIcon icon="briefcase" size="lg" />
            </div>
            <h4><span>C</span>orporate</h4>
          </div>

          <div className="flex items-center pa-item">
            <div className="icon-container">
              <FontAwesomeIcon icon="copyright" size="lg" />
            </div>
            <h4><span>I</span>ntellectual Property</h4>
          </div>

          <div className="flex items-center pa-item">
            <div className="icon-container">
              <FontAwesomeIcon icon="gavel" size="lg" />
            </div>
            <h4><span>L</span>abor</h4>
          </div>

          <div className="flex items-center pa-item">
            <div className="icon-container">
              <FontAwesomeIcon icon="users" size="lg" />
            </div>
            <h4><span>C</span>ivil and Criminal Litigation</h4>
          </div>

          <div className="flex items-center pa-item">
            <div className="icon-container">
              <FontAwesomeIcon icon="hand-holding-usd" size="lg" />
            </div>
            <h4><span>T</span>ax</h4>
          </div>

        </div>
      </div>

      <div className="business-profile-container">
        <div className="business-profile-wrapper flex flex-col items-center content-center">
          <h2>Business Profile</h2>
          <div className="bp-paragraph-wrapper">
            <p className="bp-paragraph">The Lim & Yutatco-Sze Law Firm (LYS) is a full-service law office established in 2015.  It is engaged in diversified practice of law primarily focusing in corporate, labor and and tax laws.  The Firm likewise represents both corporate and individual clients in different courts and administrative agencies in the country.</p>

            <p className="bp-paragraph">The partners and lawyers of LYS are graduates of one of the country’s reputable law schools.  LYS’s founding partners, <b>Mr. Juanito R. Lim, Jr.</b> and <b>Ms. Gloriosa Yutatco-Sze</b>, received their law degrees from the San Beda University - College of Law in Mendiola, Manila (formerly San Beda College).  Apart from being lawyers, Mr. Lim is a registered civil engineer while Ms. Yutatco-Sze is a certified public accountant.</p>

            <p className="bp-paragraph">As a group of skilled and dedicated legal experts, LYS understands the importance of professional excellence and teamwork.  These are the core values by which LYS equips itself as it responds to the ever growing demands of its clients.  Each member of the Firm understands the significance of delivering clients’ demands in the most economically and time-efficient means.  As result-oriented professionals, LYS delivers its clients’ legal requirements expediently.</p>

            <p className="bp-paragraph">In view of the Philippines’ undaunted economic growth, LYS prepares itself through continuous and extensive trainings in various fields of law.  To this end, members of LYS are required to undergo different seminars and trainings relevant to Firm’s diversified fields of practice.</p>

            <p className="bp-paragraph"><b>LYS</b> envisions itself to be one of the Philippines’ dynamic and progressive law firms.</p>
          </div>
        </div>
      </div>

      <div className="team-container flex flex-col items-center">
        <div className="team-role-container">
          <h2 className="team-titles text-center">Partners</h2>
          <div className="profile-container flex sm:flex-row flex-col">
            <Profile
              img={gloPic}
              name="Atty. Gloriosa Yutatco-Sze"
              position="Partner"
              // mobile="0917-502-2674"
              email="gloriosasze@gmail.com"
            />

            <Profile
              img={junPic}
              name="Atty. Juanito Lim, Jr."
              position="Partner"
              // mobile="0917-854-5546"
              email="juanitolim@gmail.com"
            />
          </div>
        </div>

        <div className="team-role-container">
          <h2 className="team-titles text-center">Senior Associate Lawyers</h2>
          <div className="profile-container flex sm:flex-row flex-col">
            <Profile
              img={null}
              name="Atty. Mary Elizabeth Christine Rodriguez"
              // name="Atty. Mary E. C. Rodriguez"
              position="Senior Associate Lawyer"
              // mobile="0917-570-0206"
              email="mecdr.lslawfirm@gmail.com"
            />
          </div>
        </div>

        <div className="team-role-container">
          <h2 className="team-titles text-center">Junior Associate Lawyers</h2>
          <div className="profile-container flex sm:flex-row flex-col">
            <Profile
              img={null}
              name="Atty. Teoti N. Reyes"
              position="Junior Associate Lawyer"
              // mobile="0905-696-8119"
              email="tnr.lslawfirm@gmail.com"
            />
            <Profile
              img={null}
              // name="Atty. Albert Caesar M. Pereña" too long
              name="Atty. Albert Caesar M. Pereña"
              position="Junior Associate Lawyer"
              // mobile="0906-416-6037"
              email="amp.lslawfirm@gmail.com"
            />
          </div>
        </div>

      </div>

      <div class="have-legal-problems-container">
        <h2>Have Legal Problems? Let's Talk.</h2>
      </div>

      <div className="contact-container">
        <Map draggable={false} />
        <div className="contact-wrapper flex sm:flex-row justify-around flex-col items-center">
          <div className="contact-info-box">
            <h3>
              <FontAwesomeIcon icon="map-marker-alt"></FontAwesomeIcon> Address:
                <br />
              <br />
              <span>
                Unit 901 Parkway Corporate Center
                <br />
                Corporate Ave. corner Parkway Place
                <br />
                Filinvest City, Alabang
                <br />
                Muntinlupa City 1781
              </span>
            </h3>
          </div>

          <div className="contact-info-box">
            <h3>
              <FontAwesomeIcon icon="clock" size="xs"></FontAwesomeIcon> Hours:
              <br />
              <br />
              <span>
                <strong>Monday-Friday</strong> 8am - 5pm
              </span>
            </h3>
          </div>

          <div className="contact-info-box">
            <h3>
              <FontAwesomeIcon icon="phone" size="xs"></FontAwesomeIcon> Contact:
              <br />
              <span className="phone-text"> (02) 8-293-8254</span>
              <br />
              <br />

              <FontAwesomeIcon icon="envelope" size="xs"></FontAwesomeIcon> Email:
                <br />
              <span> limandsze.lf@gmail.com</span>
              <br />
            </h3>
          </div>
        </div>
      </div>

      <footer className="footer-container flex flex-col content-center items-center">
        <div className="footer-logo">
          <img src={lysLogo} alt="image" />
        </div>
        <span className="copyright">Lim & Yutatco-Sze Law Firm.</span>
        <div className="credits">
          Website by <a href="https://www.facebook.com/boazcstrike/">Boaz Michael Sze</a>.
          </div>
      </footer>

    </div>
  );
}

export default App;
