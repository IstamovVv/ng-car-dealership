import {Roles} from "./roles";

export interface User {
  id: number,
  role: string,
  username: string
}

export interface UserLoginData {
  username: string,
  password: string,
}

export interface UserRegisterData {
  username: string,
  password: string,
  countryId: number,
  firstName: string,
  lastName: string,
  patronymic: string,
  phoneNumber: number,
  isEnabled: boolean,
  role: Roles,
}

export const nullUser: User = {
  id: -1,
  role: "NULL_ROLE",
  username: "NULL_USER",
}
