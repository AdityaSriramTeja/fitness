"use client";

import { useEffect, useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("username") ?? "");
  }, []);

  return username;
}
