"use client";

import React, { useState } from "react";
import AuthBtn from "./AuthBtn";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import RedirectButton from "@/components/shared/RedirectBtn";

export default function AuthUI({ title, isSignIn }: { title: string; isSignIn: boolean }) {
  const [userType, setUserType] = useState("member");

  return (
    <div className="w-[70vw]  border-2 p-5 space-y-10 rounded-xl">
      <h1> {title} </h1>
      <div className="flex items-center gap-x-4">
        <label>Username</label>
        <input type="text" className="input " />
      </div>
      <div className="flex items-center gap-x-4 ">
        <label>Password</label>
        <input type="password" className="input" />
      </div>

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
        <AuthBtn isSignIn={isSignIn} />
        <hr className="w-full" />
        <span> {isSignIn ? "New user?" : "Already a user?"} </span>
        {isSignIn ? <RedirectButton route="/signup">Sign up</RedirectButton> : <RedirectButton route="/">Sign In</RedirectButton>}
      </div>
    </div>
  );
}
