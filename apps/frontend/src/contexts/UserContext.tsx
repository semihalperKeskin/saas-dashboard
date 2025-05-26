import { createContext, useContext } from "react";
import { z } from "zod";
import { UserInput, UserSchema } from "@vizionboard/validation";

export type User = z.infer<typeof UserSchema>;

export const UserContext = createContext<UserInput | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};
