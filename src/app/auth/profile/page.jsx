"use client"
import React, { useState } from 'react'
import { Surface } from '@heroui/react';


function Profile() {

    const[currentTabIndex, setCurrentTabIndex] = useState(0);



  return (
      <div className="w-full h-screen px-4 pt-[55px] flex flex-col items-center justify-center">

        <div className="w-full h-full grid grid-cols-6">

            <div className="col-span-1  p-4">
                
                  <Surface className="flex w-full h-full flex-col gap-3 rounded-3xl p-6" variant="tertiary">
                      <h3 className="text-base font-semibold text-foreground">Student Profile</h3>
                      


                  </Surface>                
                 </div>

            <div className="col-span-4 p-4">

                  <Surface className="flex w-full h-full flex-col gap-3 rounded-3xl p-6" variant="default">
                      <h3 className="text-base font-semibold text-foreground">Student Profile</h3>


                    </Surface>
            </div>
              <div className="col-span-1  p-4"> 
                 <Surface className="flex w-full h-full flex-col gap-3 rounded-3xl p-6" variant="default">
                  <h3 className="text-base font-semibold text-foreground">Student Profile</h3>


              </Surface> </div>


        </div>

      
    </div>
  )
}

export default Profile
