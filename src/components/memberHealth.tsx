"use client";

import { HealthProfileType } from "@/db/healthProfile";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

async function getData(username: string): Promise<HealthProfileType[]> {
  const response = await fetch(`/healthProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${username}`);
  }
  return data;
}

async function postData(
  wei: string,
  avgSleep: string,
  avgCal: string,
  ag: string,
  gender: string,
  username: string
) {
  if (
    wei === "" ||
    avgSleep === "" ||
    avgCal === "" ||
    ag === "" ||
    gender === ""
  ) {
    return "not valid";
  }
  const weight = parseInt(wei);
  const average_sleep = parseInt(avgSleep);
  const average_calories_burn = parseInt(avgCal);
  const age = parseInt(ag);

  const response = await fetch(`/api/userHealthProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weight,
      average_sleep,
      average_calories_burn,
      gender,
      age,
      username,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error posting data`);
  }
}
export const MemberHealth = ({ username }: { username: string }) => {
  const [weight, setWeight] = useState("");
  const [avgSleep, setAvgSleep] = useState("");
  const [avgCal, setAvgCal] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userHealth", username],
    queryFn: () => getData(username),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (isLoading) {
    return <Spinner />;
  }

  const handleSubmit = async () => {
    const val = await postData(weight, avgSleep, avgCal, age, gender, username);

    if (val === "not valid") {
      alert("Please fill all the fields");
    } else {
      onClose();
      refetch();
    }
  };
  return (
    <div className="border-2 rounded-xl p-5 space-y-10 ">
      <h4>Display health statistics </h4>
      {data && data.length > 0 ? (
        <div className="flex flex-wrap flex-col gap-5  max-h-[450px]">
          <span className="text-lg font-semibold capitalize  bg-slate-500/50 px-3 rounded-lg">
            weight: {data[0].weight}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            average sleep: {data[0].average_sleep}{" "}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            average calories burnt: {data[0].average_calories_burnt}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            gender: {data[0].gender}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            age: {data[0].age}
          </span>
          <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">
            health profile id: {data[0].health_profile_id}
          </span>
        </div>
      ) : (
        <>
          <Button colorScheme="blue" onClick={onOpen}>
            Data Health Data
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add user health Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Weight</FormLabel>
                  <Input
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                  />
                  <FormLabel>Average Sleep</FormLabel>
                  <Input onChange={(e) => setAvgSleep(e.target.value)} />
                  <FormLabel>Average Calories burnt</FormLabel>
                  <Input onChange={(e) => setAvgCal(e.target.value)} />
                  <FormLabel>Gender</FormLabel>
                  <Input onChange={(e) => setGender(e.target.value)} />

                  <FormLabel>Age</FormLabel>
                  <Input onChange={(e) => setAge(e.target.value)} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="green" onClick={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};
