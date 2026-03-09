import React from 'react'
import Navbar from "./Navbar"

function layout({ children }) {
  return (
    <div>
        <Navbar />
      {children}    
    </div>
  )
}

export default layout
