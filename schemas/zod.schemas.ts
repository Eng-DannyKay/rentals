import { z, ZodString } from "zod";

export const requiredStringSchema = (isRequired = true): ZodString => {
  const schema = z.string();
  return isRequired ? schema.nonempty("Field is required") : schema;
};

export const nameSchema = z
  .string()
  .nonempty("Field is required")
  .min(3, "Field should be more than 3 characters")
  .regex(/^[A-Za-z\s]+$/, "Field should only contain alphabets");

export const phoneNumberSchema = requiredStringSchema()
  .regex(/^\+?\d+$/, "Invalid phone number")
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must not exceed 15 digits");

export const emailSchema = (isRequired = true): ZodString =>
  requiredStringSchema(isRequired)
    z.email("Invalid email format")
    .min(5, "Email is too short");