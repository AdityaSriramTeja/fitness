import { CheckboxGroup, Stack, Checkbox, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminBookingDates({ setDays }: { setDays: any }) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = [...selectedValues];

    if (selectedValues.includes(value)) {
      const index = newSelectedValues.indexOf(value);
      newSelectedValues.splice(index, 1);
    } else {
      newSelectedValues.push(value);
    }

    setSelectedValues(newSelectedValues);
  };

  const handleQueryClick = () => {
    setDays(selectedValues);
  };

  return (
    <div className="flex items-center justify-evenly md:flex-row flex-col  gap-5">
      <CheckboxGroup colorScheme="green">
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          {days.map((day) => (
            <Checkbox key={day} value={day} onChange={(e) => handleCheckboxChange(e.target.value)}>
              {day}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Button colorScheme="blue" onClick={handleQueryClick}>
        Query
      </Button>
    </div>
  );
}
