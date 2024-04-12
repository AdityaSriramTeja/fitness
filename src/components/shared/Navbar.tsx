"use client";

import { useAuth, useUsername } from "@/hooks/auth";
import RedirectButton from "./RedirectBtn";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";

type Route = {
  path: string;
  label: string;
};

export default function Navbar({ routes }: { routes: Route[] }) {
  const username = useUsername();
  const { signOut } = useAuth();

  // useEffect(() => {
  //   if (!username) {
  //     window.location.href = "/login";
  //   }
  // }, [username]);

  return (
    <header className=" border-b-[1px] px-5 p-5 flex items-center justify-between">
      <span className="flex items-center gap-x-2">
        <div className="w-7 h-7 bg-white rounded-md shrink-0" />
        {username}
      </span>

      <ul className="flex gap-x-10">
        {routes.map((route, index) => {
          return (
            <li key={route.label + index}>
              <RedirectButton route={route.path} variant={"link"}>
                {route.label}
              </RedirectButton>
            </li>
          );
        })}
      </ul>

      <Link href="/">
        <Button onClick={signOut}>Log Out</Button>
      </Link>
    </header>
  );
}
