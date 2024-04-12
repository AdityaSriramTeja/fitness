"use client";
import { ExerciseRoutineLogType } from "@/db/exerciseRoutineLog";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
async function getData(username: string): Promise<ExerciseRoutineLogType[]> {
  const response = await fetch(
    `/exerciseRoutineLogByUsername?username=${username}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${username}`);
  }
  return data;
}
async function addRoutine(
  name: string,
  date: string,
  num_reps_as_string: string,
  username: string,
  onClose: () => void,
  setName: any,
  setRun_Reps: any
) {
  if (name === "" || num_reps_as_string == "") {
    return;
  }
  const num_reps = parseInt(num_reps_as_string);
  await fetch(`/exerciseRoutineLogByUsername`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, date, num_reps, username }),
  });
  setName("");
  setRun_Reps("");
  onClose();
}
export const MemberRoutine = ({ username }: { username: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useQuery({
    queryKey: ["userRoutine", username],
    queryFn: () => getData(username),
  });
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const date = new Date().toISOString().split("T")[0];

  const [run_reps, setRun_Reps] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      addRoutine(name, date, run_reps, username, onClose, setName, setRun_Reps),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoutine"] });
    },
  });

  const routines = [
    {
      name: "Push ups",
    },
    {
      name: "Sit ups",
    },
    {
      name: "Punches",
    },
    {
      name: "Swimming",
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="border-2 rounded-xl p-5 col-span-2 h-[450px]  gap-y-10  overflow-y-auto flex flex-col">
      <div className="flex justify-between">
        <h4 className="text-lg"> Your Routines </h4>
        {/* <Button onClick={() => mutate()}> Add Routine </Button> */}
        <Button onClick={onOpen}>Add Routine</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Select Routine</FormLabel>
                <Select
                  placeholder="abc"
                  onChange={(e) => setName(e.target.value)}
                >
                  {routines.map((routine, index) => (
                    <option
                      key={routine.name + "_" + index}
                      value={routine.name}
                    >
                      {routine.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Enter Reps as a number </FormLabel>
                <Input
                  type="number"
                  placeholder="20"
                  onChange={(e) => setRun_Reps(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  mutate();
                }}
              >
                {" "}
                Add Routine{" "}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {data && data.length > 0 ? (
        data.map((routine, index) => {
          return (
            <div
              className="flex gap-x-5 border-b-[1px] p-5 hover:bg-gray-600/70 hover:cursor-pointer"
              key={routine.name + "_" + index}
            >
              <div className="bg-gray-500 w-20 h-20 rounded-lg shrink-0" />
              <div className="flex flex-col h-full justify-evenly ">
                <span className="flex gap-x-2 text-xl font-semibold">
                  {" "}
                  <h5> {routine.name} </h5>X{routine.num_reps}
                </span>

                <span> {routine.date}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div> Please add exercise routines </div>
      )}
    </div>
  );
};
