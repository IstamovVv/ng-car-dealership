import { User } from "./user";
import { Tokens } from "./tokens";

export interface AuthResponse {
  token: Tokens,
  user: User,
}
