"use client";
import { ClassType } from "@/db/class";
import { useQuery } from "@tanstack/react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
async function getData(username: string): Promise<ClassType[]> {
  const response = await fetch(`/memberClassEnrolled?username=${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching achievements for ${username}`);
  }
  return data;
}

const MemberClassEnrolled = ({ username }: { username: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useQuery({
    queryKey: ["userClassEnrolled", username],
    queryFn: () => getData(username),
  });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-[30%] rounded-lg border-[1px] p-5 flex flex-col gap-y-3 relative min-h-[250px]">
      {data && data.length > 0 ? (
        <>
          <span className="flex w-full lg:items-center justify-between lg:flex-row flex-col items-start gap-y-3 ">
            {/* <p> {JSON.stringify(data)} </p> */}
            <h3 className="capitalize font-semibold ">Classes enrolled in :</h3>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody className="overflow-y-auto p-5">
                  {data.map((val: ClassType) => {
                    return (
                      <div
                        key={val.name + "_" + val.id}
                        className="border-2 rounded-lg flex flex-col p-5 space-y-4"
                      >
                        <span className="flex gap-x-4 font-semibold">
                          Name: {val.name}
                        </span>
                        <span className="flex gap-x-4 font-semibold">
                          Class Type:{" "}
                          {val.is_group_class ? "Group" : "Personal"}
                        </span>
                        <span className="flex gap-x-4 font-semibold">
                          Day: {val.day}
                        </span>
                        <span className="flex gap-x-4 font-semibold">
                          Starting Time: {val.starting_time}
                        </span>
                        <span className="flex gap-x-4 font-semibold">
                          Trainer Username: {val.trainer_username}
                        </span>
                      </div>
                    );
                  })}
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </span>
          <h4 className="absolute bottom-5 right-5 text-6xl font-bold">
            {data.length}
          </h4>
        </>
      ) : (
        <>
          <span className="flex w-full lg:items-center justify-between lg:flex-row flex-col items-start gap-y-3 ">
            <h3 className="capitalize font-semibold ">
              Number of Classes Enrolled in :
            </h3>
          </span>
          <h4 className="absolute bottom-5 right-5 text-6xl font-bold">{0}</h4>
        </>
      )}
    </div>
  );
};

export default MemberClassEnrolled;
