"use client";

import { Button, Code, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { RoomBookingType } from "@/db/room";

export default function Rooms() {
  async function fetchBookings() {
    const res = await fetch(`/api/bookings`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error fetching room bookings`);
    }

    return data;
  }

  const { data, isLoading } = useQuery<RoomBookingType[]>({
    queryKey: ["getRoomBookings"],
    queryFn: fetchBookings,
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
              <Tr key={booking.room_id}>
                <Td>{booking.room_name}</Td>
                <Td>
                  <Code colorScheme="blue">@{booking.trainer_username}</Code>
                </Td>
                <Td>{booking.class_name}</Td>
                <Td>{booking.day}</Td>
                <Td>{booking.time}</Td>
                <Td>
                  <Button size="sm" colorScheme="red" isDisabled>
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
