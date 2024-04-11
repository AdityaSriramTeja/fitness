import { RedirectButton } from "@/components/shared/redirectBtn";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center ">
      <RedirectButton route={"/member"}>member page</RedirectButton>
      <RedirectButton route={"/admin"}> Admin page</RedirectButton>
      <RedirectButton route={"/trainer"}> trainer page </RedirectButton>
    </div>
  );
}
