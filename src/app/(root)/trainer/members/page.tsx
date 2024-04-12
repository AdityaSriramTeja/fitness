"use client";
import { MemberCard } from "@/db/member";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useRef, useState } from "react";

async function getData(name: string): Promise<MemberCard[]> {
  if (name === "") {
    return [] as MemberCard[];
  }

  const response = await fetch(`/memberCards?name=${name}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${name}`);
  }
  return data;
}
export default function SearchMembers() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["userCards", search],
    queryFn: () => getData(search),
  });

  const timeoutRef = useRef<number | null>(null);
  return (
    <div className=" p-10 container mx-auto h-full flex flex-col gap-y-10">
      <div className="flex  gap-x-10">
        <Input
          placeholder="Search by name..."
          onChange={(e) => {
            if (timeoutRef.current !== null) {
              clearTimeout(timeoutRef.current);
            }
            setTimeout(() => {
              setSearch(e.target.value);
            }, 1000);
          }}
        />
      </div>
      <hr />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="flex flex-col gap-y-10">
          {data && data.length > 0 ? (
            data.map((userCard) => {
              return (
                <Link
                  key={userCard.username}
                  href={"/profile/" + userCard.username}
                >
                  <div className="border-2 rounded-lg flex justify-between p-5 hover:bg-slate-200 hover:cursor-pointer">
                    <h1> {userCard.name}</h1>
                    <h2> @{userCard.username}</h2>
                  </div>
                </Link>
              );
            })
          ) : search.length > 0 ? (
            <div> User doesn&apos;t exist</div>
          ) : (
            <p>
              {" "}
              Please start typing the name of the user you want to search for.
              Auto query will be trigged for better user experience
            </p>
          )}
        </section>
      )}
    </div>
  );
}
