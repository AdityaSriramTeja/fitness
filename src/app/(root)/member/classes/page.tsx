"use client";

import { SimpleGrid, Box, Heading, Text, Button } from "@chakra-ui/react";

import SelectClassDates from "./_components/SelectClassDates";
import { ClassType } from "@/db/class";
import React, { useEffect, useState } from "react";
import { useUsername } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";

export default function Classes() {
  const username = useUsername();
  const [classes, setClasses] = useState<ClassType[]>([]);
  // const [enrolled, setEnrolled] = useState<boolean>(false);

  async function enrollInClass({ classData }: { classData: ClassType }) {
    try {
      const enrolled_class_id = classData.id;
      const response = await fetch(`/class/bookClass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, enrolled_class_id: enrolled_class_id }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function unEnroll() {
    try {
      const response = await fetch(`/class/unEnroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchEnrollmentStatus() {
    if (!username) return false;

    const response = await fetch(`/class/isEnrolled`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    return data;
  }

  const { data: enrolled, refetch } = useQuery({
    queryKey: ["isEnrolled", username],
    queryFn: () => fetchEnrollmentStatus(),
  });

  return (
    <div className="h-full p-10 flex flex-col">
      <section className="w-full ">
        <SelectClassDates setClasses={setClasses} />
        {!!enrolled && (
          <div>
            <div className="flex flex-col items-center">
              <Button
                onClick={() => {
                  unEnroll();
                }}
              >
                Unenroll From Class
              </Button>
            </div>
            <br />
          </div>
        )}
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
              <div className="flex flex-col items-center">
                <Button
                  onClick={() => {
                    enrollInClass({ classData });
                  }}
                >
                  Enroll In Class
                </Button>
              </div>
            </Box>
          ))}
        </SimpleGrid>
      </section>
    </div>
  );
}
