import React from "react";
import { Checkbox, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export type PropType = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: {
    label: "9AM - 10AM" | "10AM - 11AM" | "11AM - 12PM" | "12PM - 1PM" | "1PM - 2PM" | "2PM - 3PM" | "3PM - 4PM" | "4PM - 5PM" | "5PM - 6PM" | "6PM - 7PM" | "7PM - 8PM" | "8PM - 9PM";
    value: "09:00:00" | "10:00:00" | "11:00:00" | "12:00:00" | "13:00:00" | "14:00:00" | "15:00:00" | "16:00:00" | "17:00:00" | "18:00:00" | "19:00:00" | "20:00:00";
  };
  trainerUsername: string;
};

async function fetchTrainerSlots(trainerUsername: string) {
  const response = await fetch(`/scheduleSlot/${trainerUsername}/slots`);
  const data = await response.json();
  return data;
}

export default function SlotCheckbox({ day, startTime, trainerUsername }: PropType) {
  const { data, isLoading } = useQuery({ queryKey: ["getTrainerSlots", trainerUsername], queryFn: fetchTrainerSlots });

  return (
    <Flex>
      <Checkbox colorScheme="green" size="lg" />
    </Flex>
  );
}
