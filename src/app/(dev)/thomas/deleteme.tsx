"use client";

import { getAchievements } from "@/db/achievements";
import { Button, Center } from "@chakra-ui/react";
import React from "react";

export default function Page() {
  async function handleClick() {
    const res = await getAchievements();
    console.log(res);
  }

  return (
    <Center h="100vh">
      <Button onClick={handleClick} colorScheme="blue">
        Test!
      </Button>
    </Center>
  );
}
