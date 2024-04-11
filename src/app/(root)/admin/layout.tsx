import React from "react";
import AdminNav from "./_components/AdminNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <AdminNav />
      <div className="p-10">{children}</div>
    </div>
  );
}
