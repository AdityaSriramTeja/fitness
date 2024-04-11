"use client";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Checkbox, Select, Flex } from "@chakra-ui/react";
import SlotCheckbox from "./_components/SlotCheckbox";
import { useUsername } from "@/hooks/auth";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = [
  { label: "9AM - 10AM", value: "09:00:00" },
  { label: "10AM - 11AM", value: "10:00:00" },
  { label: "11AM - 12PM", value: "11:00:00" },
  { label: "12PM - 1PM", value: "12:00:00" },
  { label: "1PM - 2PM", value: "13:00:00" },
  { label: "2PM - 3PM", value: "14:00:00" },
  { label: "3PM - 4PM", value: "15:00:00" },
  { label: "4PM - 5PM", value: "16:00:00" },
  { label: "5PM - 6PM", value: "17:00:00" },
  { label: "6PM - 7PM", value: "18:00:00" },
  { label: "7PM - 8PM", value: "19:00:00" },
  { label: "8PM - 9PM", value: "20:00:00" },
];

export default function Schedule() {
  const username = useUsername();

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Schedule Availability Picker</TableCaption>
          <Thead>
            <Tr>
              <Th>Time</Th>
              {days.map((day, idx) => (
                <Th key={idx}>{day}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {slots.map((slot, idx) => (
              <Tr key={idx}>
                <Td>{slot.label}</Td>
                {days.map((day, idx) => (
                  <Td key={idx}>
                    <SlotCheckbox day={day} startingTime={slot.value} trainerUsername={username} />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
