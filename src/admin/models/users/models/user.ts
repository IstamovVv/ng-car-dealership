export interface UserData {
  username: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  countryId: string,
  role: string,
  phoneNumber: number
}

export interface User extends UserData {
  id: number,
}
