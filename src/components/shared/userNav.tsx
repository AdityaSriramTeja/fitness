"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { RedirectButton } from './redirectBtn';


// Define an interface for your route object
interface Route {
    path: string;
    label: string;
    isActive: (pathname: string) => boolean; 
  }
  

  const routes: Route[] = [
    {
      path: "/member",
      label: "Dashboard",
      isActive: (pathname) => pathname === "/member",
    },
    { path: "/schedule", label: "Schedule", 
    isActive: (pathname) => pathname === "/member"
     },
     { path: "/routines", label: "Routines",
     isActive: (pathname) => pathname === "/member"
      },
    { path: "/profile", label: "Profile",
    isActive: (pathname) => pathname === "/member"
     },
   
  ];
  
  export default routes;

  
export const UserNav = () => {
    const pathname = usePathname();

  return (
    <header className=' border-b-[1px] px-5 p-5 flex items-center justify-between'> 
        <span className='flex items-center gap-x-2'> <div className='w-7 h-7 bg-white rounded-md shirnk-0'/> username </span>
       
        <ul className='flex gap-x-10'> 
           {routes.map((route, index) =>{ 
             return (
                // TODO, DON'T USE INDEX HAS A KEY
               <li key={route.label + index} > 
               <RedirectButton route={route.path} variant={"link"}> {route.label}</RedirectButton>
               
               </li>
             )
           })}
        </ul>
    </header>
  )
}
