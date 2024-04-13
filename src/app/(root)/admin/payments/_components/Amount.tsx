"use client";

import { Kbd } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Amount({ username }: { username: string }) {
  async function fetchData(username: string) {
    const response = await fetch(`/api/transactions?username=${username}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error fetching amount");
    }

    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getAmount", username],
    queryFn: () => fetchData(username),
  });

  if (data && data.length > 0) {
    return <Kbd fontSize="medium">${data[0].sum}.00</Kbd>;
  }

  return "–";
}
