import RedirectButton from "@/components/shared/RedirectBtn";


export default function Home() {
  return (
    <div className="h-full w-full flex items-center ">
      <RedirectButton route={"/login/member"}>Member Page</RedirectButton>
      <RedirectButton route={"/login/admin"}>Admin Page</RedirectButton>
      <RedirectButton route={"/login/trainer"}>Trainer Page</RedirectButton>
    </div>
  );
}
