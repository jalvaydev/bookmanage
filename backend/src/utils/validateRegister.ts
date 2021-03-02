import { RegisterInput } from "src/resolvers/user";
import { validateEmail } from "./validateEmail";

export const validateRegister = (input: RegisterInput) => {
  if (input.firstName.length <= 2) {
    return new Error("first name must be at least length 2");
  }
  if (input.lastName.match("/^([a-z0-9]|[-._](?![-._])){4,20}$/")) {
    return new Error("last name must be at least length 2");
  }
  if (input.password.length <= 2) {
    return new Error("password must be of at least length 2");
  }
  if (!validateEmail(input.email)) {
    return new Error("email is invalid");
  }
  return null;
};
