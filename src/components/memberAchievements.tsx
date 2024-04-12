"use client";

import { AchievementType } from "@/db/achievements";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

async function getData(username: string): Promise<AchievementType[]> {
  const response = await fetch(`/memberAchievement?username=${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${username}`);
  }
  return data;
}

export const MemberAchievements = ({ username }: { username: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userAchievement", username],
    queryFn: () => getData(username),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="border-2 rounded-xl p-5 space-y-10 max-h-[450px] overflow-y-auto">
      <h4>Fitness Achievements </h4>
      {data && data.length > 0 ? (
        data.map((item, index) => {
          return (
            <div
              className="flex gap-x-5 border-b-[1px] p-5 hover:bg-gray-300 hover:cursor-pointer"
              key={item.name + index}
            >
              <div className="bg-gray-500 w-20 h-20 rounded-lg shrink-0" />
              <div className="flex flex-col space-y-4 w-full">
                <div className="justify-between flex col">
                  <h5 className="font-bold"> {item.name} </h5>
                  <div className="font-xs text-gray-500">{item.date}</div>
                </div>
                <p className="line-clamp-1"> {item.description} </p>
              </div>
            </div>
          );
        })
      ) : (
        <div> No achievements</div>
      )}
    </div>
  );
};
