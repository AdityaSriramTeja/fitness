"use client";

import React, { useState } from "react";
import AdminBookingDates from "./_components/AdminBookingDates";
import { DetailChips } from "@/components/shared/detailChips";
import { useQuery } from "@tanstack/react-query";
import { TrainerAvailabilityType } from "@/db/trainerAvailability";
import NewClassModal from "./_components/NewClassModal";
import { Button } from "@chakra-ui/react";
import { RoomType } from "@/db/room";

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

export default function AdminBooking() {
  const [filterDays, setFilterDays] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TrainerAvailabilityType | null>(null);

  const {
    data: roomsData,
    isLoading: roomsIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllRooms", selectedSlot?.starting_time ?? ""],
    queryFn: () => fetchRooms(selectedSlot?.starting_time ?? ""),
  });

  const { data: slotData, isLoading: slotIsLoading } = useQuery({
    queryKey: ["getTrainerAvailabilities", filterDays],
    queryFn: () => fetchTrainerSlots(filterDays),
  });

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

  const onOpen = (slot: TrainerAvailabilityType) => {
    setSelectedSlot(slot);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-y-10">
      <NewClassModal refetch={refetch} setIsOpen={setIsOpen} isOpen={isOpen} selectedSlot={selectedSlot} roomsData={roomsData} roomsIsLoading={roomsIsLoading} />
      <AdminBookingDates setDays={setFilterDays} />
      <hr />
      <div className="flex flex-wrap gap-6">
        {filterDays.length > 0 ? (
          !slotIsLoading ? (
            slotData && slotData!.length > 0 ? (
              slotData.map((slot: TrainerAvailabilityType) => {
                return (
                  <div key={slot.id} className="border-2 rounded-lg p-5 flex flex-col gap-y-5 w-[230px]">
                    <span className="flex w-full justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{slot.trainer_username}</h2>
                      </div>
                      <DetailChips label={slot.day.substring(0, 3)} />
                    </span>

                    <hr />

                    <div className="flex flex-col items-center gap-y-4">
                      <label className="font-semibold underline">Slots</label>

                      <Button
                        onClick={() => {
                          onOpen(slot);
                        }}
                      >
                        {slot.starting_time}
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div> No slots available</div>
            )
          ) : (
            <div> Fetching Data </div>
          )
        ) : (
          <div>Create or manage classes here. To create a new class, please query by a day first!</div>
        )}
      </div>
    </div>
  );
}
