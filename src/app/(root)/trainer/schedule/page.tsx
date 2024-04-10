"use client";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Checkbox, Select, Flex } from "@chakra-ui/react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM", "12PM - 1PM", "1PM - 2PM", "2PM - 3PM", "3PM - 4PM", "4PM - 5PM", "5PM - 6PM", "6PM - 7PM", "7PM - 8PM", "8PM - 9PM"];

export default function Schedule() {
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
                <Td>{slot}</Td>
                {days.map((day, idx) => (
                  <Td key={idx}>
                    <Flex>
                      <Checkbox colorScheme="green" size="lg" />
                    </Flex>
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
