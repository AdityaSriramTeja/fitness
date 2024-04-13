"use client";

import React, { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td, Checkbox, Input, IconButton, Select, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoomType } from "@/db/room";

export default function NewEquipmentRow({ refetch }: { refetch: () => void }) {
  const [name, setName] = React.useState("");
  const [roomID, setRoomID] = React.useState("-1");
  const [needsMaintenance, setNeedsMaintenance] = React.useState(false);

  async function fetchRooms() {
    const res = await fetch(`/room`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error fetching rooms`);
    }

    return data;
  }

  async function addEquipment() {
    await fetch(`/api/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, room_id: parseInt(roomID), needs_maintenance: needsMaintenance }),
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const { data, isLoading } = useQuery<RoomType[]>({
    queryKey: ["getRooms"],
    queryFn: fetchRooms,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addEquipment,
    onSuccess: () => {
      refetch();
      setName("");
    },
  });

  useEffect(() => {
    if (data && data.length > 0) setRoomID(data[0].id.toString());
  }, [data]);

  return (
    <Tr>
      <Td>
        <form onSubmit={handleSubmit}>
          <IconButton size="sm" aria-label="Add class" icon={<AddIcon />} rounded="full" colorScheme="blue" isLoading={isPending} type="submit" /> 
          <Input required variant="ghost" placeholder="Add new equipment" value={name} onChange={(e) => setName(e.target.value)} />
        </form>
      </Td>
      <Td>
        {isLoading && <Spinner />}
        {data && data.length > 0 && (
          <Select width="fit-content" onChange={(e) => setRoomID(e.target.value)} defaultValue={data[0].id}>
            {data?.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </Select>
        )}
      </Td>
      <Td>
        <Checkbox isChecked={needsMaintenance} onChange={(e) => setNeedsMaintenance(e.target.checked)} />
      </Td>
    </Tr>
  );
}
