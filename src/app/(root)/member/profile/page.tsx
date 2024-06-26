"use client";

import { MemberType } from "@/db/member";
import { ClassType } from "@/db/class";
import { MemberFitnessGoal } from "@/components/shared/member/fitnessGoal";
import { useUsername } from "@/hooks/auth";
import { Button, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const username = useUsername();
  const [fees, setFees] = useState<number>();
  const [curClasses, setCurClasses] = useState<ClassType[]>();
  const [memberName, setMemberName] = useState<string>();

  useEffect(() => {
    if (username) {
      fetchMemberData();
    }
  }, [username]);

  async function fetchMemberData(): Promise<MemberType[]> {
    if (!username) return [];
    const response = await fetch(`/api/member?username=${username}`);
    const data = (await response.json()) as MemberType[];

    if (data.length === 0) return [];
    setMemberName(data[0].name);
    const feesResponse = await fetch(`/api/transactions?username=${username}`);
    const feesData = (await feesResponse.json()) as { sum: number }[];
    setFees(feesData[0]?.sum || 0);

    if (data[0].enrolled_class_id === null) {
      setCurClasses([]);
      return [];
    }
    const classResponse = await fetch(
      `/class/byId?id=${data[0].enrolled_class_id}`
    );
    const classData = (await classResponse.json()) as ClassType[];
    setCurClasses(classData);
    return data;
  }

  async function newTransaction() {
    const name = prompt("What is this transaction for?");
    const amount = parseInt(
      prompt("Enter amount (only numbers are allowed)") ?? "0"
    );

    if (typeof name !== "string" || typeof amount !== "number") {
      alert("Invalid input");
      return;
    }

    const date = new Date().toISOString().split("T")[0];

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount, username, date }),
    });

    if (!res.ok) {
      alert("Error adding transaction");
    }

    fetchMemberData();
  }

  async function updateMemberData() {
    const newName = prompt("Enter new name");
    console.log(newName);
    if (!newName) {
      alert("Name wasn't changed, because input was empty");
      return;
    }
    const res = await fetch(`/api/member?username=${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name: newName }),
    });

    if (!res.ok) {
      alert("Error updating member name");
    }
    fetchMemberData();
  }
  return (
    <div className="p-10 h-full flex flex-col gap-y-10 ">
      <section className="flex items-center w-full gap-x-5">
        <div className="w-20 h-20 bg-black rounded-xl flex" />
        <div className="flex flex-col gap-y-3">
          <h1 className="font-bold text-xl flex-1"> @{username} </h1>
          <h2> Name : {memberName}</h2>
        </div>
        <button
          className="p-2 rounded-lg border-2 hover:bg-slate-400/40 shadow-md"
          onClick={updateMemberData}
        >
          Update name
        </button>
      </section>
      <section className="flex flex-wrap w-full gap-10">
        <div className="w-[30%] rounded-lg border-[1px] p-5 flex flex-col gap-y-3 relative">
          <h3 className="capitalize font-semibold ">
            Outstanding Membership fee:
          </h3>
          <h4 className="md:text-6xl font-bold text-3xl flex-1 ">
            ${fees !== undefined ? `${fees}` : <Spinner />}
          </h4>
          <Button w="full" colorScheme="yellow" onClick={newTransaction}>
            Deposit Fee
          </Button>
        </div>
        {username ? <MemberFitnessGoal username={username} /> : <Spinner />}
        <div className="w-[30%] rounded-lg border-[1px] p-5 flex flex-col gap-y-3 relative min-h-[250px]">
          {curClasses !== undefined ? (
            curClasses.length !== 0 ? (
              <div>
                <h3 className="capitalize font-semibold">
                  {" "}
                  Class enrolled in:
                </h3>
                <br />
                <div className="flex flex-col bg-gray-100 rounded-lg shadow-md p-4 mb-4 gap-y-2">
                  <h3 className=" text-lg font-medium text-gray-800">
                    {curClasses[0].name}
                  </h3>
                  <p className="text-gray-600 mb-2">{curClasses[0].day}</p>
                  <span className="text-sm text-gray-400">
                    {curClasses[0].starting_time}
                  </span>
                </div>
              </div>
            ) : (
              <h3 className="capitalize font-semibold ">
                Not Enrolled in any class.
              </h3>
            )
          ) : (
            <h3 className="capitalize font-semibold ">
              <Spinner />
            </h3>
          )}
        </div>
      </section>
    </div>
  );
}
