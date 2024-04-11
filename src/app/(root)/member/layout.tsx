import UserNav from "./_components/UserNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-scree">
      <UserNav />
      <div className="h-full w-full"> {children}</div>
    </div>
  );
}
