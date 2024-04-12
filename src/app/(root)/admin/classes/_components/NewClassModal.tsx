"use client";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";
import { Button, Input, Radio, RadioGroup, Select, Spinner, Stack } from "@chakra-ui/react";
import { TrainerAvailabilityType } from "@/db/trainerAvailability";
import { RoomType } from "@/db/room";
import { useState } from "react";
import { DetailChips } from "@/components/shared/detailChips";

interface CreateClassType {
  name: string;
  is_group_class: boolean;
  room_id: number;
  day: string;
  schedule_slot_id: number;
  trainer_username: string;
}

type PropType = {
  refetch: () => void;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  selectedSlot: TrainerAvailabilityType | null;
  roomsData: RoomType[] | undefined;
  roomsIsLoading: boolean;
};

export default function NewClassModal({ refetch, setIsOpen, isOpen, selectedSlot, roomsData, roomsIsLoading }: PropType) {
  const [createClass, setCreateClass] = useState<CreateClassType>({
    name: "",
    is_group_class: true,
    room_id: -1,
    day: "",
    schedule_slot_id: -1,
    trainer_username: "",
  });

  async function createClassAndBookRoom(createClass: CreateClassType, selectedSlot: TrainerAvailabilityType) {
    if (createClass.name === "" || createClass.room_id === -1) {
      return;
    }
    const room_id = createClass.room_id;
    const is_group_class = createClass.is_group_class;
    const day = selectedSlot.day;
    const start_time = selectedSlot.starting_time;
    const trainer_username = selectedSlot.trainer_username;
    const name = createClass.name;

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

    refetch();
    setIsOpen(false);
  }

  function onClose() {
    setIsOpen(false);
  }

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
              <Input placeholder="Class Name" size="md" onChange={handleNameChange} />
              <RadioGroup defaultValue="group_class" onChange={handleGroupChange}>
                <Stack spacing={4} direction="row">
                  <Radio value="group_class">Group</Radio>
                  <Radio value="personal_class">Personal</Radio>
                </Stack>
              </RadioGroup>
              {roomsIsLoading ? (
                <Spinner />
              ) : (
                <Select placeholder="Select Room" onChange={(e) => handleRoomChange(parseInt(e.target.value))}>
                  {roomsData &&
                    roomsData.map((room: RoomType) => (
                      <option key={room.id} value={room.id}>
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
          <Button colorScheme="green" onClick={() => createClassAndBookRoom(createClass, selectedSlot!)}>
            Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
