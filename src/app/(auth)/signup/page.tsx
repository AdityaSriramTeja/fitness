"use client";

import AuthUI from "../_components/AuthUI";

export type NewUserType = {
  userType: string;
  username: string;
  password: string;
  name: string;
};

export default function SignUp() {
  async function handleSubmit(newUser: NewUserType) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      alert("Failed to create user (is username unique?)");
      return true;
    }

    window.localStorage.setItem("username", newUser.username);
    window.location.href = `/${newUser.userType}`;
    return false; // never reached
  }

  return <AuthUI title="Sign Up" isSignIn={false} handleSubmit={handleSubmit} />;
}
