"use client";

import { useEffect, useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("username") ?? null);
  }, []);

  return username;
}

export function useAuth() {
  function signOut() {
    window.localStorage.removeItem("username");
  }

  return { signOut };
}
