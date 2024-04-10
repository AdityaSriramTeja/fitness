"use client";
import React from "react";
import { Button, Select } from "@chakra-ui/react";
export const QueryRoutine = () => {
  return (
    <div className="flex w-full items-center justify-evenly ">
      <div className="flex flex-col gap-y-5">
        <h2 className="text-sm"> Query routine by label </h2>
        <Select placeholder="Select option">
          <option value="pushups">Push ups</option>
          <option value="situps">Sit ups</option>
          <option value="punches">Punches</option>
        </Select>
      </div>
      <Button colorScheme={"blue"}> Query </Button>
    </div>
  );
};
