"use client";

import React from "react";
import RedirectButton from "@/components/shared/RedirectBtn";

interface Route {
  path: string;
  label: string;
}

const routes: Route[] = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/booking", label: "Booking" },
  { path: "/admin/transactions", label: "Transactions" },
  { path: "/admin/profile", label: "Profile" },
];

export default function AdminNav() {
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
