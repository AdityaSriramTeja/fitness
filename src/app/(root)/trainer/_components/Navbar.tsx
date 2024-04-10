"use client";

import React from "react";
import { RedirectButton } from "@/components/shared/redirectBtn";

interface Route {
  path: string;
  label: string;
}

const routes: Route[] = [
  { path: "/trainer", label: "Dashboard" },
  { path: "/trainer/schedule", label: "Schedule" },
  { path: "/trainer/members", label: "Members" },
  { path: "/trainer/profile", label: "Profile" },
];

export default function Navbar() {
  return (
    <header className=" border-b-[1px] px-5 p-5 flex items-center justify-between">
      <span className="flex items-center gap-x-2">
        <div className="w-7 h-7 bg-white rounded-md shrink-0" />
        username
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
