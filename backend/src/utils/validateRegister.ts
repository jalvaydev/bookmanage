import { RegisterInput } from "src/resolvers/user";
import { validateEmail } from "./validateEmail";

export const validateRegister = (input: RegisterInput) => {
  if (input.firstName.length <= 2) {
    return {
      errors: [
        {
          field: "first name",
          message: "first name must be at least length 2",
        },
      ],
    };
  }
  if (input.lastName.length <= 2) {
    return {
      errors: [
        {
          field: "last name",
          message: "last name must be at least length 2",
        },
      ],
    };
  }
  if (input.password.length <= 2) {
    return {
      errors: [
        {
          field: "password",
          message: "password must be at least length 2",
        },
      ],
    };
  }
  if (!validateEmail(input.email)) {
    return {
      errors: [
        {
          field: "email",
          message: "invalid email has been entered",
        },
      ],
    };
  }
  return null;
};
