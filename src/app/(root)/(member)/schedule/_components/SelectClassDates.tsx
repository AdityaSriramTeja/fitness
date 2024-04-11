import { CheckboxGroup, Stack, Checkbox, Button, Select } from "@chakra-ui/react";

import React, { useState } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// HARD CODED DATA
const classes = [
  { id: 1, name: "Class 1", is_group_class: true, room_id: 1, day: "Monday", starting_time: "09:00:00", trainer_username: "trainer1" },
  { id: 2, name: "Class 2", is_group_class: true, room_id: 2, day: "Monday", starting_time: "12:00:00", trainer_username: "trainer2" },
];

export default function SelectClassDates() {
  const [selectedValues, setSelectedValues] = useState<string[]>(days);
  // const [classValues, setClassValues] = useState<ClassType[]>([]);

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
    // setDays(selectedValues);
    // setClasses(classValues);
  }

  return (
    <div>
      <div className="flex items-center justify-evenly md:flex-row flex-col  gap-5">
        <CheckboxGroup colorScheme="green" defaultValue={days}>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {days.map((day) => (
              <Checkbox key={day} value={day} onChange={(e) => handleCheckboxChange(e.target.value)}>
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
}
