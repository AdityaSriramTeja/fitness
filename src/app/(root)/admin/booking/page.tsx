"use client";
import React, { useState } from "react";
import { AdminBookingDates } from "../_components/AdminBookingDates";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { DetailChips } from "@/components/shared/detailChips";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrainerAvailabilityType } from "@/db/trainerAvailability";
import { RoomType } from "@/db/room";
import { ClassType } from "@/db/class";

interface CreateClassType {
  name: string;
  is_group_class: boolean;
  room_id: number;
  day: string;
  schedule_slot_id: number;
  trainer_username: string;
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
async function createClassAndBookRoom(
  createClass: CreateClassType,
  selectedSlot: TrainerAvailabilityType
) {
  if (createClass.name === "" || createClass.room_id === -1) {
    return;
  }
  const room_id = createClass.room_id;
  const booked = true;
  const is_group_class = createClass.is_group_class;
  const day = selectedSlot.day;
  const start_time = selectedSlot.starting_time;
  const trainer_username = selectedSlot.trainer_username;
  const name = createClass.name;

  // await fetch(`/room`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ room_id, booked }),
  // });
  // sql`insert into Trainer_Availability
  //    (name, is_group_class, room_id, day, starting_time, trainer_username) values (${name}, ${is_group_class}, ${room_id}, ${day}, ${schedule_slot_id}, ${trainer_username})`;

  await fetch(`/class`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      is_group_class,
      room_id,
      day,
      start_time,
      trainer_username,
    }),
  });
}
async function fetchRooms(start_time: string | undefined) {
  if (start_time === undefined) {
    return;
  }
  const response = await fetch(`/roomAvailable?start_time=${start_time}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error rooms`);
  }

  return data;
}

const AdminBooking = () => {
  const [filterDays, setFilterDays] = useState<string[]>([]);
  const [createClass, setCreateClass] = useState<CreateClassType>({
    name: "",
    is_group_class: true,
    room_id: -1,
    day: "",
    schedule_slot_id: -1,
    trainer_username: "",
  });
  const { data: slotData, isLoading: slotIsLoading } = useQuery({
    queryKey: ["getTrainerAvailabilities", filterDays],
    queryFn: () => fetchTrainerSlots(filterDays),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => fetchRooms(selectedSlot?.starting_time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllRooms"] });
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] =
    useState<TrainerAvailabilityType | null>(null);
  const { data: roomsData, isLoading: roomsIsLoading } = useQuery({
    queryKey: ["getAllRooms", selectedSlot?.starting_time],
    queryFn: () => fetchRooms(selectedSlot?.starting_time),
  });
  const onOpen = (slot: TrainerAvailabilityType) => {
    setSelectedSlot(slot);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleNameChange = (e: any) => {
    setCreateClass((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleGroupChange = (value: string) => {
    setCreateClass((prevState) => ({
      ...prevState,
      is_group_class: value === "group_class",
    }));
  };

  const handleRoomChange = (roomId: number) => {
    const selectedRoomId = roomId;
    setCreateClass((prevState) => ({
      ...prevState,
      room_id: selectedRoomId,
    }));
  };

  return (
    <div className="flex flex-col gap-y-10">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedSlot && (
              <span className="flex flex-row items-center text-sm justify-between">
                <h4>{selectedSlot.trainer_username} </h4>
                <h5> Starting: {selectedSlot.starting_time}</h5>
                <DetailChips label={selectedSlot.day} />
              </span>
            )}
          </ModalHeader>

          <ModalBody>
            {selectedSlot && (
              <Stack direction={"column"} spacing={6}>
                <Input
                  placeholder="Classs Name"
                  size="md"
                  onChange={handleNameChange}
                />
                <RadioGroup
                  defaultValue="group_class"
                  onChange={handleGroupChange}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="group_class">Group</Radio>
                    <Radio value="personal_class">Personal</Radio>
                  </Stack>
                </RadioGroup>
                {roomsIsLoading ? (
                  <Spinner />
                ) : (
                  <Select placeholder="Select Room">
                    {roomsData &&
                      roomsData.map((room: RoomType) => (
                        <option
                          key={room.id}
                          value="option1"
                          onClick={() => handleRoomChange(room.id)}
                        >
                          {room.name}
                        </option>
                      ))}
                  </Select>
                )}
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => createClassAndBookRoom(createClass, selectedSlot!)}
            >
              Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AdminBookingDates setDays={setFilterDays} />
      <hr />
      <div className="flex flex-wrap gap-6">
        {filterDays.length > 0 ? (
          !slotIsLoading ? (
            slotData && slotData!.length > 0 ? (
              slotData.map((slot: TrainerAvailabilityType) => {
                return (
                  <div
                    key={slot.id}
                    className="border-2 rounded-lg p-5 flex flex-col gap-y-5 w-[230px]"
                  >
                    <span className="flex w-full justify-between">
                      <div>
                        {" "}
                        <h2 className="text-xl font-bold">
                          {slot.trainer_username}
                        </h2>{" "}
                      </div>{" "}
                      <DetailChips label={slot.day.substring(0, 3)} />
                    </span>

                    <hr />

                    <div className="flex flex-col items-center gap-y-4">
                      <label className="font-semibold underline">Slots</label>

                      <Button
                        onClick={() => {
                          onOpen(slot);
                          mutate();
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
          <div> Please query by a day first </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooking;
