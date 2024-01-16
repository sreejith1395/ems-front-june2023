import React, { useState } from 'react'
import { createContext } from 'react'

export const registerContext=createContext()

function Contextshare({children}) {
const[registerData,setregisterData]=useState("")

  return (
      <registerContext.Provider value={{registerData,setregisterData}}>
        {children}
      </registerContext.Provider>
  )
}

export default Contextshare