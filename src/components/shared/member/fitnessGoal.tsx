"use client";
import { FitnessGoalType } from "@/db/fitnessGoal";
import { Button, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getData(username: string): Promise<FitnessGoalType[]> {
  const response = await fetch(`/memberFitnessGoal?username=${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${username}`);
  }
  return data;
}

async function deleteFitnessGoal(goal: FitnessGoalType) {
  const id = goal.id;
  const response = await fetch(`/fitnessGoal`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

export const MemberFitnessGoal = ({ username }: { username: string }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userFitnessGoal", username],
    queryFn: () => getData(username),
  });

  async function handleNew() {
    const name = prompt("Enter goal name");
    const description = prompt("Enter goal description");
    const date = prompt("Enter goal date (YYYY-MM-DD)");

    if (!name || !description || !date) {
      return;
    }

    const res = await fetch("/fitnessGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, description, date }),
    });

    if (!res.ok) {
      alert("Error adding goal");
    }

    refetch();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-[30%] rounded-lg border-[1px] p-5 flex flex-col gap-y-3">
      <h3 className="capitalize font-semibold"> Fitness goals:</h3>
      {data && data.length > 0 ? (
        data.map((goal) => (
          <div key={goal.id} className="flex flex-col bg-gray-100 rounded-lg shadow-md p-4 mb-4 gap-y-2">
            <h3 className=" text-lg font-medium text-gray-800">{goal.name}</h3>
            <p className="text-gray-600 mb-2">{goal.description}</p>
            <span className="text-sm text-gray-400">{goal.date}</span>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => {
                deleteFitnessGoal(goal);
                refetch();
              }}
            >
              Delete Fitness Goal
            </Button>
          </div>
        ))
      ) : (
        <div> Member didn&apos;t set any fitness goals </div>
      )}
      <Button colorScheme="blue" onClick={handleNew}>
        New Goal
      </Button>
    </div>
  );
};
