import VerifyClient from "./verifyClient";

export const metadata = {
  title: "Verify Your Account",
  description:
    "Enter the 6-digit code to complete your registration and verify your account.",
  openGraph: {
    title: "Verify Your Account",
    description:
      "Enter the 6-digit code to complete your registration and verify your account.",
    type: "website",
  },
};

const Verify = () => {
  return <VerifyClient />;
};

export default Verify;
