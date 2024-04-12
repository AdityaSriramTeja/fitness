"use client";

import React, { useState } from "react";
import { Heading, Button, Flex, Radio, RadioGroup, Stack, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";
import Link from "next/link";
import { NewUserType } from "../signup/page";

type PropType = { title: string; isSignIn: boolean; handleSubmit: (newUser: NewUserType) => void };

export default function AuthUI({ title, isSignIn, handleSubmit }: PropType) {
  const [userType, setUserType] = useState("member");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <form
      className="w-[70vw]  border-2 p-5 space-y-10 rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ userType, username, password, name });
      }}
    >
      <Heading size="md">{title}</Heading>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input isRequired={true} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <FormHelperText>Enter a unique username. Uniqueness is enforced in PostgreSQL.</FormHelperText>
        {/* <FormErrorMessage>Email is required.</FormErrorMessage> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input isRequired={true} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FormHelperText>Enter a password.</FormHelperText>
        {/* <FormErrorMessage>Email is required.</FormErrorMessage> */}
      </FormControl>
      {isSignIn ? null : (
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input isRequired={true} type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <FormHelperText>Enter your full name.</FormHelperText>
          {/* <FormErrorMessage>Email is required.</FormErrorMessage> */}
        </FormControl>
      )}

      {isSignIn ? null : (
        <RadioGroup onChange={setUserType} value={userType}>
          <Stack justifyContent="space-evenly" direction="row" w="full">
            <Radio value="member">Member</Radio>
            <Radio value="trainer">Trainer</Radio>
            <Radio value="admin">Admin</Radio>
          </Stack>
        </RadioGroup>
      )}

      <div className="flex flex-col items-center w-full gap-y-6">
        <Button colorScheme="blue" type="submit" w="full">
          {isSignIn ? "Log In" : "Sign Up"}
        </Button>
        <hr className="w-full" />
        <Flex gap="2">
          {isSignIn ? "New user?" : "Already a user?"}{" "}
          <Link href={isSignIn ? "/signup" : "/"}>
            <Button variant="link" colorScheme="blue">
              Click here to {isSignIn ? "sign up" : "log in"} instead!
            </Button>
          </Link>
        </Flex>
      </div>
    </form>
  );
}
