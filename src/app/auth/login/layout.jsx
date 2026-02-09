import Navbar from "@/app/auth/login/Navbar"
import React from 'react'

function layoyt({children}) {
  return (
    <div>
        <Navbar />
      {children}
    </div>
  )
}

export default layoyt
