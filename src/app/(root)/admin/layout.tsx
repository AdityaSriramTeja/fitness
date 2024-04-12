import React from "react";
import Navbar from "@/components/shared/Navbar";

const routes = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/classes", label: "Classes" },
  { path: "/admin/classes", label: "Rooms" },
  { path: "/admin/transactions", label: "Transactions" },
  { path: "/admin/profile", label: "Profile" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Navbar routes={routes} />
      <div className="p-10">{children}</div>
    </div>
  );
}
