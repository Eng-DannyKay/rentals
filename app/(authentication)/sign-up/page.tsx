import AuthenticationFrame from "@/components/authenticationFrame";
import SignUpForm from "@/components/signUpForm";
import React from "react";

export const metadata = {
  title: "Create Your reantals Account",
  description:
    "Sign up as a customer to get started with reantals. Create your account today and enjoy our premium services.",
  openGraph: {
    title: "Create Your reantals Account ",
    description:
      "Sign up as a customer to get started with reantals. Create your account today and enjoy our premium services.",
    type: "website",
  },
};

const SignUp = () => {
  return (
    <AuthenticationFrame
      subText="Sign up as a customer to get started"
      title="Create Your reantals Account"
    >
      <SignUpForm />
    </AuthenticationFrame>
  );
};

export default SignUp;
