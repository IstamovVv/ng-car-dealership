export interface User {
  id: number,
  role: string,
  username: string
}

export const nullUser: User = {
  id: -1,
  role: "NULL_ROLE",
  username: "NULL_USER",
}
