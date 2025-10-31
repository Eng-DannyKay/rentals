import AuthenticationFrame from "@/components/authenticationFrame";
import SignInForm from "@/components/signInForm";
import React from "react";

export const metadata = {
  title: "Sign in",
  description:
    "Sign in as a customer to access your  account and start enjoying our services.",
  openGraph: {
    title: "Sign in ",
    description:
      "Sign in as a customer to access your account and start enjoying our services.",
    type: "website",
  },
};

const SignIn = () => {
  return (
    <AuthenticationFrame
      subText="Sign in as a customer to get started"
      title="Sign Into Your reantals Account"
    >
      <SignInForm />
    </AuthenticationFrame>
  );
};

export default SignIn;
