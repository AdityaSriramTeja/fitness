import RedirectButton from "@/components/shared/RedirectBtn";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center ">
      <RedirectButton route={"/member"}>Member Page</RedirectButton>
      <RedirectButton route={"/admin"}>Admin Page</RedirectButton>
      <RedirectButton route={"/trainer"}>Trainer Page</RedirectButton>
    </div>
  );
}
