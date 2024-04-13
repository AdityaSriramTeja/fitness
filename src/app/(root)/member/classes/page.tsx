"use client";

import { SimpleGrid, Flex, Heading, Text, Button, Code } from "@chakra-ui/react";

import SelectClassDates from "./_components/SelectClassDates";
import { ClassType } from "@/db/class";
import React, { useState } from "react";
import { useUsername } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { MemberType } from "@/db/member";

export default function Classes() {
  const username = useUsername();
  const [classes, setClasses] = useState<ClassType[]>([]);

  async function enrollInClass({ classData }: { classData: ClassType }) {
    const enrolled_class_id = classData.id;
    const response = await fetch(`/class/bookClass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, enrolled_class_id: enrolled_class_id }),
    });

    refetch();
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

    refetch();
  }

  async function fetchEnrolledClassID(): Promise<number | null> {
    if (!username) return -1;

    const response = await fetch(`/api/member?username=${username}`);
    const data = (await response.json()) as MemberType[];

    if (data.length === 0) return -1;

    return data[0].enrolled_class_id;
  }

  const { data: enrolledClassID, refetch } = useQuery({
    queryKey: ["getEnrolledClassID", username],
    queryFn: fetchEnrolledClassID,
  });

  const isEnrolled = enrolledClassID !== -1 && enrolledClassID !== null;

  return (
    <div className="h-full p-10 flex flex-col">
      <section className="w-full ">
        <SelectClassDates setClasses={setClasses} />

        <SimpleGrid columns={4} spacing={10}>
          {classes.map((classData) => (
            <Flex key={classData.id} p={5} shadow="md" borderWidth="1px" gap="5" flexDir="column">
              <Heading fontSize="xl">{classData.name}</Heading>
              <Text>ID: {classData.id}</Text>
              <Text>Group Class: {classData.is_group_class ? "Yes" : "No"}</Text>
              <Text>Room ID: {classData.room_id}</Text>
              <Text>Day: {classData.day}</Text>
              <Text>Starting Time: {classData.starting_time}</Text>
              <Code w="fit-content" alignSelf="center">
                @{classData.trainer_username}
              </Code>
              <div className="flex flex-col items-center">
                {isEnrolled ? (
                  enrolledClassID === classData.id && (
                    <Button onClick={unEnroll} colorScheme="red">
                      Unenroll
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => {
                      enrollInClass({ classData });
                    }}
                    colorScheme="blue"
                    rounded="full"
                  >
                    Enroll
                  </Button>
                )}
              </div>
            </Flex>
          ))}
        </SimpleGrid>
      </section>
    </div>
  );
}
