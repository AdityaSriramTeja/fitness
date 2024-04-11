"use client";

import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";

import SelectClassDates from "@/app/(root)/(member)/schedule/_components/SelectClassDates";
import { ClassType } from "@/db/class";
import React, { useState, useEffect } from "react";

const SchedulePage = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);

  return (
    <div className="h-full p-10 flex flex-col">
      <section className="w-full ">
        <SelectClassDates setClasses={setClasses} />
        <SimpleGrid columns={4} spacing={10}>
          {classes.map((classData) => (
            <Box key={classData.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{classData.name}</Heading>
              <Text mt={4}>ID: {classData.id}</Text>
              <Text mt={4}>Group Class: {classData.is_group_class ? "Yes" : "No"}</Text>
              <Text mt={4}>Room ID: {classData.room_id}</Text>
              <Text mt={4}>Day: {classData.day}</Text>
              <Text mt={4}>Starting Time: {classData.starting_time}</Text>
              <Text mt={4}>Trainer Username: {classData.trainer_username}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </section>
    </div>
  );
};

export default SchedulePage;
