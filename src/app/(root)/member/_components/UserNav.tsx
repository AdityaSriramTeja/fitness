"use client";

import React from "react";
import RedirectButton from "@/components/shared/RedirectBtn";

// Define an interface for your route object
interface Route {
  path: string;
  label: string;
}

const routes: Route[] = [
  { path: "/member", label: "Dashboard" },
  { path: "/member/classes", label: "Classes" },
  { path: "/member/routines", label: "Routines" },
  { path: "/member/profile", label: "Profile" },
];

export default function UserNav() {
  return (
    <header className=" border-b-[1px] px-5 p-5 flex items-center justify-between">
      <span className="flex items-center gap-x-2">
        <div className="w-7 h-7 bg-white rounded-md shirnk-0" /> username{" "}
      </span>

      <ul className="flex gap-x-10">
        {routes.map((route, index) => {
          return (
            <li key={route.label + index}>
              <RedirectButton route={route.path} variant={"link"}>
                {route.label}
              </RedirectButton>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
