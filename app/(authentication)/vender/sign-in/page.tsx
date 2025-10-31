import AuthenticationFrame from "@/components/authenticationFrame";
import VendorSignUpForm from "@/components/venderSignUpFrom";
import React from "react";

export const metadata = {
  title: "Vendor Sign In | rentals",
  description:
    "Sign in as a vendor to access your rentals dashboard and manage your services.",
  openGraph: {
    title: "Vendor Sign In | rentals",
    description:
      "Sign in as a vendor to access your rentals dashboard and manage your services.",
    type: "website",
  },
};

const venderSignIn = () => {
    return ( 
        <AuthenticationFrame
      subText="Sign up as a vendor to get started"
      title="Create Your rentals Account"
    >
      <VendorSignUpForm />
    </AuthenticationFrame>
     );
}
 
export default venderSignIn;