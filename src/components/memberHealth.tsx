"use client";

import { HealthProfileType } from "@/db/healthProfile";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getData(username: string): Promise<HealthProfileType[]> {
  const response = await fetch(`/healthProfile`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${username}`);
  }
  return data;
}

export const MemberHealth = ({ username }: { username: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userHealth", username],
    queryFn: () => getData(username),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="border-2 rounded-xl p-5 space-y-10 ">
      <h4>Display health statistics </h4>
      {data && data.length > 0 ? (
        <div className="flex flex-wrap flex-col gap-5  max-h-[450px]">
          <span className="text-lg font-semibold capitalize  bg-slate-500/50 px-3 rounded-lg">
            weight: {data[0].weight}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            average sleep: {data[0].average_sleep}{" "}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            average calories burnt: {data[0].average_calories_burnt}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            gender: {data[0].gender}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            age: {data[0].age}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            health profile id: {data[0].health_profile_id}
          </span>
        </div>
      ) : (
        <div>...</div>
      )}
    </div>
  );
};
