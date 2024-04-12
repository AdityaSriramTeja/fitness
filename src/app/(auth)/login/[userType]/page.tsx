"use client";

import AuthUI from "../../_components/AuthUI";

export default function SignIn({ params }: { params: { userType: string } }) {
  const capitalizeFirstChar = params.userType.charAt(0).toUpperCase() + params.userType.slice(1);

  return <AuthUI isSignIn={true} title={`${capitalizeFirstChar} Sign In`} />;
}
