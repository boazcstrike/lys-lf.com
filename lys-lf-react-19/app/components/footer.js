import React from "react"

import lysLogo from "@/assets/images/lys-white-logo-darker.png"

function Footer() {
  return (
    <footer className="footer-container flex flex-col content-center items-center">
      <div className="footer-logo">
        <img src={lysLogo.src} alt="image" />
      </div>
      <span className="copyright">Lim & Yutatco-Sze Law Firm.</span>
      <div className="credits">
        Website by{" "}
        <a href="https://www.facebook.com/boazcstrike/">Boaz Sze</a>.
      </div>
    </footer>
  )
}

export default Footer
