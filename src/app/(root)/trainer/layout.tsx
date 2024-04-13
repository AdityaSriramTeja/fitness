import Navbar from "@/components/shared/Navbar";
import React from "react";

export const routes = [
  { path: "/trainer/schedule", label: "Schedule" },
  { path: "/trainer/members", label: "Members" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar routes={routes} />
      {children}
    </div>
  );
}
