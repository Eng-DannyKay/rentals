import AuthenticationFrame from "@/components/authenticationFrame";
import VendorSignUpForm from "@/components/venderSignUpFrom";
import React from "react";

export const metadata = {
  title: "Vendor Sign In | Wheels",
  description:
    "Sign in as a vendor to access your Wheels dashboard and manage your services.",
  openGraph: {
    title: "Vendor Sign In | Wheels",
    description:
      "Sign in as a vendor to access your Wheels dashboard and manage your services.",
    type: "website",
  },
};

const venderSignIn = () => {
    return ( 
        <AuthenticationFrame
      subText="Sign up as a vendor to get started"
      title="Create Your Wheels Account"
    >
      <VendorSignUpForm />
    </AuthenticationFrame>
     );
}
 
export default venderSignIn;