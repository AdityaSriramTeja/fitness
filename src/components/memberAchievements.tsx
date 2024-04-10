"use client";

import { AchievementType } from "@/db/achievements";
import React, { useEffect, useState } from "react";

export const MemberAchievements = () => {
  const [data, setData] = useState<AchievementType[]>([]);

  useEffect(() => {
    fetch("/achievement")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="border-2 rounded-xl p-5 space-y-10 max-h-[450px] overflow-y-auto">
      <h4>Fitness Achievements </h4>
      {data.map((item, index) => {
        return (
          <div className="flex gap-x-5 border-b-[1px] p-5 hover:bg-gray-300 hover:cursor-pointer" key={item.name + index}>
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
      })}
    </div>
  );
};
