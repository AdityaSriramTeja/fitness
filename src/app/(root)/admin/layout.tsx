import React from "react";
import Navbar from "@/components/shared/Navbar";

const routes = [
  { path: "/admin/classes", label: "Classes" },
  { path: "/admin/rooms", label: "Rooms" },
  { path: "/admin/equipment", label: "Equipment" },
  { path: "/admin/payments", label: "Payments" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Navbar routes={routes} />
      <div className="p-10">{children}</div>
    </div>
  );
}
