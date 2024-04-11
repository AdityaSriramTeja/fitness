import { ClassType } from "@/db/class";
import {
  CheckboxGroup,
  Stack,
  Checkbox,
  Button,
  Select,
  SimpleGrid,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type PropType = {
  setClasses: (classes: ClassType[]) => void;
};

export default function SelectClassDates({setClasses}: PropType) {
  const [selectedValues, setSelectedValues] = useState<string[]>(days);
  // const [classValues, setClassValues] = useState<ClassType[]>([]);

  console.log("selectedValues", selectedValues);

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

  async function handleQueryClick() {
    try {
      const response = await fetch(`/class/byDays`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: selectedValues }),
      });
      const data = await response.json();
      // console.log("data", data)
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-evenly md:flex-row flex-col  gap-5">
        <CheckboxGroup colorScheme="green" defaultValue={days}>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {days.map((day) => (
              <Checkbox
                key={day}
                value={day}
                onChange={(e) => handleCheckboxChange(e.target.value)}
              >
                {day}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        <div className="w-[30%]">
          <Select placeholder="Select option">
            <option value="pushups">Push ups</option>
            <option value="situps">Sit ups</option>
            <option value="punches">Punches</option>
          </Select>
        </div>
        <Button colorScheme="blue" onClick={handleQueryClick}>
          Query
        </Button>
      </div>
    </div>
  );
};
