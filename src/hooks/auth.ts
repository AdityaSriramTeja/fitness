"use client";

import { useEffect, useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("username") ?? "");
  }, []);

  return username;
}

export function useAuth() {
  function signOut() {
    window.localStorage.removeItem("username");
  }

  return { signOut };
}
