import React from "react";

export default function AuthBtn({ isSignIn }: { isSignIn: boolean }) {
  return <>{isSignIn ? <button className="flex justify-center border-2 p-1 rounded-xl w-full hover:bg-slate-700/50"> Sign In </button> : <button className="flex justify-center border-2 p-1 rounded-xl w-full hover:bg-slate-700/50"> Sign Up </button>}</>;
}
