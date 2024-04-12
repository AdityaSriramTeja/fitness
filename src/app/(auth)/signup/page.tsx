"use client";

import { useState } from "react";
import AuthUI from "../_components/AuthUI";

export type NewUserType = {
  userType: string;
  username: string;
  password: string;
  name: string;
};

export default function SignUp() {
  const [user, setUser] = useState<NewUserType | null>(null);

  function handleSubmit(newUser: NewUserType) {
    window.location.href = `/${newUser.userType}`;
  }

  return <AuthUI title="Sign Up" isSignIn={false} handleSubmit={handleSubmit} />;
}
