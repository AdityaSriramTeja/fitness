"use client";

import { MemberType } from "@/db/member";
import { ClassType } from "@/db/class";
import { FitnessGoalType } from "@/db/fitnessGoal";
import { MemberFitnessGoal } from "@/components/shared/member/fitnessGoal";
import { useUsername } from "@/hooks/auth";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";

export default function ProfilePage() {
  const username = useUsername();
  const [fees, setFees] = useState<number>();
  const [curClasses, setCurClasses] = useState<ClassType[]>();
  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoalType[]>();

  useEffect(() => {
    if (username) {
      fetchMemberData();
    }
  }, [username || fitnessGoals]);

  async function fetchMemberData(): Promise<MemberType[]> {
    if (!username) return [];
    const response = await fetch(`/api/member?username=${username}`);
    const data = await response.json() as MemberType[];
    if (data.length === 0) return [];
    setFees(data[0].outstanding_balance);

    if (data[0].enrolled_class_id === null) {
      setCurClasses([]);
      return [];
    }
    const classResponse = await fetch(`/class/byId?id=${data[0].enrolled_class_id}`);
    const classData = await classResponse.json() as ClassType[];
    setCurClasses(classData);

    const fitnessGoalResponse = await fetch(`/fitnessGoal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const fitnessGoalData = await fitnessGoalResponse.json() as FitnessGoalType[];
    setFitnessGoals(fitnessGoalData);
    return data;
  }

  return (
    <div className="p-10 h-full flex flex-col gap-y-10 ">
      <section className="flex items-center w-full gap-x-5">
        <div className="w-20 h-20 bg-black rounded-xl" />
        <h1 className="font-bold text-xl flex-1"> Username </h1>
        <button className="p-2 rounded-lg border-2 hover:bg-slate-400/40 shadow-md">
          Settings
        </button>
      </section>
      <section className="flex flex-wrap w-full gap-10">
        <div className="w-[30%] rounded-lg border-[1px] p-5 flex flex-col gap-y-3 relative">
          <span className="flex w-full lg:items-center justify-between lg:flex-row flex-col items-start gap-y-3 ">
            <h3 className="capitalize font-semibold ">
              Outstanding Membership fee:
            </h3>
            <button className="border-2 text-sm shadow-sm  px-4 py-2 rounded-md hover:bg-slate-400/40">
              Transactions
            </button>
          </span>
          <h4 className="absolute bottom-5 right-5 md:text-6xl font-bold text-3xl ">
            ${fees !== undefined ? `${fees}` : <Spinner />}
          </h4>
        </div>
        {username ? (
          <MemberFitnessGoal username={username} />
        ) : (
          <Spinner />
        )}
        <div className="w-[30%] rounded-lg border-[1px] p-5 flex flex-col gap-y-3 relative min-h-[250px]">
        {curClasses !== undefined ? (
          curClasses.length !== 0 ? (
            <div>
              <h3 className="capitalize font-semibold"> Class enrolled in:</h3>
              <br/>
              <div className="flex flex-col bg-gray-100 rounded-lg shadow-md p-4 mb-4 gap-y-2">
                <h3 className=" text-lg font-medium text-gray-800">{curClasses[0].name}</h3>
                <p className="text-gray-600 mb-2">{curClasses[0].day}</p>
                <span className="text-sm text-gray-400">{curClasses[0].starting_time}</span>
              </div>
            </div>
            ) : (
            <h3 className="capitalize font-semibold ">Not Enrolled in any class.</h3>
            )
          ) : (
          <h3 className="capitalize font-semibold "><Spinner /></h3>
          )
        }
        </div>
      </section>
    </div>
  );
};
