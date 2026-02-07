
import React from 'react'
import NavbarHeroUi from "./Navbar"

function layout({ children }) {
  return (
    <div>
      <NavbarHeroUi />
      {children}
    </div>
  )
}

export default layout
