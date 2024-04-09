import React from 'react'

interface RoutineInterface {
    routineName: string;
    routineDescription: string;
}

const routineList: RoutineInterface[] = [
    {
        routineName: "Weight Lifting",
        routineDescription: "Weight lifting is a routine that helps you maintain your weight."
    }, 
    {
        routineName: "Cardio",
        routineDescription: "Cardio is a routine that helps you maintain your cardio."
    }, 
    {
        routineName: "Strength Training",
        routineDescription: "Strength training is a routine that helps you maintain your strength."
    },

  
]
export const MemberRoutine = () => {
  return (
    <div className="border-2 rounded-xl p-5 col-span-2 h-[450px]  gap-y-10  overflow-y-auto flex flex-col">
        <h4 className='text-lg'> Your Routines </h4>
        {routineList.map((routine, index) => {
            return(
                <div className='flex gap-x-5 border-b-[1px] p-5 hover:bg-gray-600/70 hover:cursor-pointer' key={routine.routineName + index}> 
                    <div className='bg-gray-500 w-20 h-20 rounded-lg shrink-0'/>
                    <div className='flex flex-col h-full justify-evenly '> 
                        <h5 > {routine.routineName} </h5>
                        <p> {routine.routineDescription} </p>
                    </div> 

                  
                </div> 
            )
        })}
    </div>

  )
}
