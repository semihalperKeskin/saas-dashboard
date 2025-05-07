import { createContext, useContext } from "react";
import { z } from "zod";
import { UserSchema } from "@vizionboard/validation";

export type User = z.infer<typeof UserSchema>;

export const UserContext = createContext<User | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};
