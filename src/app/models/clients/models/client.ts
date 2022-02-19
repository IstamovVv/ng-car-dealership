export interface ClientData {
  first_name: string,
  last_name: string,
  patronymic: string,
  address: string,
  identity_dn: number,
}

export interface Client extends ClientData {
  id: number,
}
