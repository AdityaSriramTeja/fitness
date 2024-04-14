"use client";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, useDisclosure, Spinner } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "@/db/transactions";
import { MemberType } from "@/db/member";
import Amount from "./_components/Amount";

async function getData(username: string, onOpen: () => void): Promise<TransactionType[]> {
  if (username === "") return [] as TransactionType[];

  const response = await fetch(`/memberTransactions?username=${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching trainers`);
  }
  onOpen();
  return data;
}

async function fetchMembers(): Promise<MemberType[]> {
  const response = await fetch(`/api/member`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching trainers`);
  }

  return data;
}
export default function PaymentsList() {
  const [selectedUser, setSelectedUser] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useQuery({
    queryKey: ["MemberTransactions", selectedUser],
    queryFn: () => getData(selectedUser, onOpen),
  });

  const {
    data: memberList,
    isLoading: memberListLoading,
    refetch,
  } = useQuery({
    queryKey: ["getEnrolledClassID"],
    queryFn: fetchMembers,
  });

  return (
    <div className="h-screen   px-5">
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedUser("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h1 className="capitalized">
              {selectedUser.charAt(0).toUpperCase() + selectedUser.slice(1)}
              &apos;s Transactions
            </h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-y-5">
            {isLoading ? (
              <Spinner />
            ) : data && data.length > 0 ? (
              data.map((transaction) => (
                <div key={transaction.id} className="w-full flex flex-col gap-y-4 border-2 p-5 rounded-lg shadow-sm font-semibold text-lg capitalize">
                  <label> Name : {transaction.name}</label>
                  <label> username : {transaction.username}</label>
                  <label> amount: {transaction.amount}</label>
                  <label className="opacity-50"> date : {transaction.date}</label>
                </div>
              ))
            ) : (
              <div> User did not make an transactions </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {memberListLoading ? (
        <span className="flex items-center gap-x-5">
          Fetching user list <Spinner />
        </span>
      ) : (
        memberList && (
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Total Payments</Th>
                  <Th isNumeric> View Transactions </Th>
                </Tr>
              </Thead>

              <Tbody>
                {memberList.map((val) => (
                  <Tr key={val.username}>
                    <Td>{val.username}</Td>
                    <Td>
                      <Amount username={val.username} />
                    </Td>
                    <Td isNumeric>
                      <Button
                        colorScheme={"blue"}
                        onClick={() => {
                          setSelectedUser(val.username);
                        }}
                      >
                        View Transactions
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </div>
  );
}
