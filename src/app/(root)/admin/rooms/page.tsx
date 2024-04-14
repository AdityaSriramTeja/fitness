"use client";

import { Button, Code, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoomBookingType } from "@/db/room";
import stc from "string-to-color";

export default function Rooms() {
  async function fetchBookings() {
    const res = await fetch(`/api/bookings`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error fetching room bookings`);
    }

    return data;
  }

  async function deleteClass({ class_id }: { class_id: number }) {
    const res = window.confirm("Are you sure you want to cancel this booking? Doing so will de-register all users from this class.");
    if (!res) return;

    await fetch(`/api/bookings`, {
      method: "DELETE",
      body: JSON.stringify({ class_id }),
    });

    refetch();
  }

  const { data, isLoading, refetch } = useQuery<RoomBookingType[]>({
    queryKey: ["getRoomBookings"],
    queryFn: fetchBookings,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteClass,
  });

  return (
    <div>
      <Heading mb="6">Manage Room Bookings {isLoading && <Spinner />}</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of all room bookings</TableCaption>
          <Thead>
            <Tr>
              <Th>Room Name</Th>
              <Th>Trainer</Th>
              <Th>Class Name</Th>
              <Th>Day</Th>
              <Th>Time</Th>
              <Th>Admin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((booking) => (
              <Tr key={`${booking.trainer_username}-${booking.day}-${booking.time}`}>
                <Td>{booking.room_name}</Td>
                <Td>
                  <Code color={stc(booking.trainer_username)}>@{booking.trainer_username}</Code>
                </Td>
                <Td>{booking.class_name}</Td>
                <Td>{booking.day}</Td>
                <Td>{booking.time}</Td>
                <Td>
                  <Button isLoading={isPending} loadingText="Loading..." size="sm" colorScheme="red" onClick={() => mutate({ class_id: booking.class_id })}>
                    Cancel
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
