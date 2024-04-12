"use client";

import AuthUI from "../../_components/AuthUI";
import { NewUserType } from "../../signup/page";

export default function SignIn({ params }: { params: { userType: string } }) {
  const capitalizeFirstChar = params.userType.charAt(0).toUpperCase() + params.userType.slice(1);

  async function handleSubmit(user: NewUserType) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userType: params.userType,
        username: user.username,
        password: user.password,
      }),
    });

    if (!res.ok) {
      alert("Failed to sign in");
      return;
    }

    window.localStorage.setItem("username", user.username);
    window.location.href = `/${params.userType}`;
  }

  return <AuthUI isSignIn={true} title={`${capitalizeFirstChar} Sign In`} handleSubmit={handleSubmit} />;
}
