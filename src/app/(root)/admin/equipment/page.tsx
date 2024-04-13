"use client";

import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Checkbox } from "@chakra-ui/react";
import { Heading, Spinner } from "@chakra-ui/react";
import { ParsedEquipmentType } from "@/db/equipment";
import { useMutation, useQuery } from "@tanstack/react-query";
import NewEquipmentRow from "./_components/NewEquipmentRow";

export default function Equipment() {
  async function fetchEquipment() {
    const res = await fetch(`/api/equipment`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error fetching equipment`);
    }

    return data;
  }

  async function updateEquipmentMaintenance(id: number, needs_maintenance: boolean) {
    const res = await fetch(`/api/equipment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, needs_maintenance }),
    });

    if (!res.ok) {
      throw new Error(`Error updating equipment maintenance`);
    }

    refetch();
  }

  const { data, isLoading, refetch } = useQuery<ParsedEquipmentType[]>({
    queryKey: ["getEquipment"],
    queryFn: fetchEquipment,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { id: number; needs_maintenance: boolean }): Promise<void> => {
      await updateEquipmentMaintenance(data.id, data.needs_maintenance);
    },
  });

  return (
    <div>
      <Heading mb="6">Manage Equipment {isLoading && <Spinner />}</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of all gym equipment</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Room</Th>
              <Th>Needs Maintenance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((equipment) => (
              <Tr key={equipment.id}>
                <Td>{equipment.name}</Td>
                <Td>{equipment.room_name}</Td>
                <Td>
                  <Checkbox disabled={isPending} isChecked={equipment.needs_maintenance} onChange={() => mutate({ id: equipment.id, needs_maintenance: !equipment.needs_maintenance })} />
                </Td>
              </Tr>
            ))}
            <NewEquipmentRow refetch={refetch} />
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
