import React from 'react'

interface AchievementInterface {
    name: string;
    description: string;
}

const achievementList: AchievementInterface[] = [
    {
        name: "5K Race Finisher",
        description: "Completed a 5 kilometer running race, demonstrating endurance and perseverance.",
      },
      {
        name: "Mastered a New Exercise Technique",
        description: "Successfully learned and incorporated a new exercise technique, improving form and efficiency.",
      },
      {
        name: "Achieved Personal Weight Loss Goal",
        description: "Reached a personal weight loss target through dedication to healthy eating and exercise.",
      },
      {
        name: "Increased Strength by X%",
        description: "Successfully increased strength in a specific exercise by X%, demonstrating progress and dedication to training.",
      },
      {
        name: "Maintained Consistent Workout Routine for Y Weeks",
        description: "Committed to a workout routine for Y consecutive weeks, building a strong fitness habit.",
      },

  
]
export const MemberAchievements = () => {
  return (
    <div className="border-2 rounded-xl p-5 space-y-10 max-h-[450px] overflow-y-auto">
    <h4>Fitness Achievements </h4>
    {achievementList.map((item, index)=>{ 
        return( 
            <div className='flex gap-x-5 border-b-[1px] p-5 hover:bg-gray-600/70 hover:cursor-pointer' key={item.name + index}> 
                <div className='bg-gray-500 w-20 h-20 rounded-lg shrink-0'/>
                <div className='flex flex-col gap-y-4 '> 
                    <h5 > {item.name} </h5>
                    <p className='line-clamp-1'> {item.description} </p>
                </div> 

            </div>
        )
    })}
   
</div>
  )
}
