export interface ManagerData {
  first_name: string,
  last_name: string,
  patronymic: string,
  address: string,
  identity_dn: number,
}

export interface Manager extends ManagerData {
  id: number,
}
