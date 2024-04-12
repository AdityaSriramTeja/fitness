import Navbar from "@/components/shared/Navbar";
import React from "react";

const routes = [
  { path: "/trainer", label: "Dashboard" },
  { path: "/trainer/schedule", label: "Schedule" },
  { path: "/trainer/members", label: "Members" },
  { path: "/trainer/profile", label: "Profile" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar routes={routes} />
      {children}
    </div>
  );
}
