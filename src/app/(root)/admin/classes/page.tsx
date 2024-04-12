"use client";

import React, { useEffect, useState } from "react";
import AdminBookingDates from "./_components/AdminBookingDates";
import { useQuery } from "@tanstack/react-query";
import { TrainerAvailabilityType } from "@/db/trainerAvailability";
import NewClassModal from "./_components/NewClassModal";
import { Badge, Button, Code, Flex } from "@chakra-ui/react";
import { RoomType } from "@/db/room";
import { TrainerType } from "@/db/trainer";
import { getColorByDay } from "@/lib/utils";

async function fetchRooms(start_time: string | undefined): Promise<RoomType[]> {
  if (!start_time) {
    return [];
  }
  const response = await fetch(`/roomAvailable?start_time=${start_time}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error rooms`);
  }

  return data as RoomType[];
}

async function fetchTrainerSlots(days: string[]) {
  if (days.length === 0) {
    return [];
  }

  const results = [];

  for (const day of days) {
    const response = await fetch(`/trainerAvailabilityByDay?day=${day}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error fetching trainer slots for day ${day}`);
    }

    results.push(...data);
  }
  return results;
}

async function fetchTrainers() {
  const response = await fetch(`/api/trainer`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching trainers`);
  }

  return data;
}

export default function AdminBooking() {
  const [filterDays, setFilterDays] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TrainerAvailabilityType | null>(null);

  const {
    data: roomsData,
    isLoading: roomsIsLoading,
    refetch: refetchRooms,
  } = useQuery({
    queryKey: ["getAllRooms", selectedSlot?.starting_time ?? ""],
    queryFn: () => fetchRooms(selectedSlot?.starting_time ?? ""),
  });

  const {
    data: slotData,
    isLoading: slotIsLoading,
    refetch: refetchTrainerSlots,
  } = useQuery({
    queryKey: ["getTrainerAvailabilities", filterDays],
    queryFn: () => fetchTrainerSlots(filterDays),
  });

  const {
    data: trainersData,
    isLoading: trainersIsLoading,
    refetch: refetchTrainers,
  } = useQuery({
    queryKey: ["getAllTrainers"],
    queryFn: fetchTrainers,
  });

  const onOpen = (slot: TrainerAvailabilityType) => {
    setSelectedSlot(slot);
    setIsOpen(true);
  };

  const isLoading = slotIsLoading || trainersIsLoading;

  useEffect(() => {
    refetchTrainerSlots();
    refetchTrainers();
  }, [filterDays]);

  return (
    <div className="flex flex-col gap-y-10">
      <NewClassModal
        refetch={() => {
          refetchRooms();
          refetchTrainerSlots();
        }}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        selectedSlot={selectedSlot}
        roomsData={roomsData}
        roomsIsLoading={roomsIsLoading}
      />
      <AdminBookingDates setDays={setFilterDays} />
      <hr />
      <div className="flex flex-wrap gap-6">
        {filterDays.length > 0 ? (
          !isLoading ? (
            trainersData && trainersData!.length > 0 ? (
              trainersData.map((trainer: TrainerType) => {
                return (
                  <div key={trainer.username} className="border-2 rounded-lg p-5 flex flex-col gap-y-5 w-[230px]">
                    <span className="flex w-full justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{trainer.username}</h2>
                      </div>
                    </span>

                    <hr />

                    <div className="flex flex-col items-center gap-y-4">
                      <label className="font-semibold underline">Slots</label>

                      {slotData &&
                        slotData.map((slot: TrainerAvailabilityType) => {
                          if (slot.trainer_username === trainer.username) {
                            return (
                              <Button
                                key={slot.id}
                                onClick={() => {
                                  onOpen(slot);
                                }}
                                colorScheme="green"
                              >
                                <Flex alignItems="center" gap="2">
                                  <Badge colorScheme={getColorByDay(slot.day)}>{slot.day.substring(0, 3)}</Badge>
                                  <Code>{slot.starting_time}</Code>
                                </Flex>
                              </Button>
                            );
                          }
                        })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No trainers available</div>
            )
          ) : (
            <div>Fetching Data...</div>
          )
        ) : (
          <div>Create or manage classes here. To create a new class, please query by a day first!</div>
        )}
      </div>
    </div>
  );
}
