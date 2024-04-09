import React from 'react'
import {AuthBtn} from './authBtn'
import { RedirectButton } from './redirectBtn'
import Link from 'next/link'


const AuthUI = ({title, isSignIn}: {title:string, isSignIn:boolean}) => {
  return (
    <div className='w-[70vw]  border-2 p-5 space-y-10 rounded-xl'>
        <h1> {title} </h1>
        <div className="flex items-center gap-x-4"> 
        <label>Username</label>
        <input type="text" className='input '/>
        
        </div>
        <div className="flex items-center gap-x-4 "> 
        <label>Password</label>
        <input type="text" className='input'/>
        </div>

      
        
            
            <div className='flex flex-col items-center w-full gap-y-6'>
                <AuthBtn isSignIn={isSignIn}/> 
                <hr className='w-full'/>
                <span> {isSignIn ? "New user?": "Already a user?" } </span>
                {isSignIn ? 
             
                
                <RedirectButton route="/sign-up"> Sign up </RedirectButton>
       
                 :   
                
                 <RedirectButton route="/sign-in" > Sign In </RedirectButton>
              
     
                }
             </div>  
          
     
        
           

    </div>
  )
}

export default AuthUI