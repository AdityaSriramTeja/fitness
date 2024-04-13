"use client";
import { FitnessGoalType } from "@/db/fitnessGoal";
import { Button, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const { data, isLoading } = useQuery({
    queryKey: ["userFitnessGoal", username],
    queryFn: () => getData(username),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => getData(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFitnessGoal"] });
    },
  });

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
                mutate();
              }}
            >
              Delete Fitness Goal
            </Button>
          </div>
        ))
      ) : (
        <div> Member didn&apos;t set any fitness goals </div>
      )}
    </div>
  );
};
