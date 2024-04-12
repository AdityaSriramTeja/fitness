import Navbar from "@/components/shared/Navbar";

const routes = [
  { path: "/member", label: "Dashboard" },
  { path: "/member/classes", label: "Classes" },
  { path: "/member/routines", label: "Routines" },
  { path: "/member/profile", label: "Profile" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-scree">
      <Navbar routes={routes} />
      <div className="h-full w-full"> {children}</div>
    </div>
  );
}
