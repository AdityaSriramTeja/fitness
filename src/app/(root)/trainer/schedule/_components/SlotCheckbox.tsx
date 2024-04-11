"use client";

import React, { useMemo } from "react";
import { Checkbox, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrainerAvailabilityType } from "@/db/trainerAvailability";

export type PropType = {
  day: string;
  startingTime: string;
  trainerUsername: string;
};

export default function SlotCheckbox({ day, startingTime, trainerUsername }: PropType) {
  // handler functions
  async function fetchTrainerSlots() {
    const response = await fetch(`/trainerAvailability?trainerUsername=${trainerUsername}`);
    const data = await response.json();
    return data as TrainerAvailabilityType[];
  }

  async function updateTrainerSlot() {
    if (!isAvail) {
      await fetch(`/trainerAvailability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainerUsername, day, startingTime }),
      });
    } else {
      await fetch(`/trainerAvailability`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainerUsername, day, startingTime }),
      });
    }
  }

  // react-query
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["getTrainerSlots", trainerUsername], queryFn: fetchTrainerSlots });
  const { mutate, isPending } = useMutation({
    mutationFn: updateTrainerSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTrainerSlots"] });
    },
  });

  // computed values
  const isAvail = useMemo(() => {
    return data?.some((slot: TrainerAvailabilityType) => slot.day === day && slot.starting_time === startingTime);
  }, [data, day, startingTime]);

  if (isLoading || isPending) return <Spinner size="sm" />;

  return <Checkbox colorScheme="green" size="lg" isChecked={isAvail} onChange={() => mutate()} />;
}
