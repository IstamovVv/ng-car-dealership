export interface APIResponse<T> {
  results: Array<T>;
}

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

export interface SupplierData {
  name: string,
}

export interface Supplier extends SupplierData {
  id: number,
}

export interface CarData {
  supplier_id: number,
  model: string,
}

export interface Car extends CarData{
  id: number,
}

export interface SupplyData {
  car_id: number,
  amount: number,
  price: number,
  date: string,
}

export interface Supply extends SupplyData {
  id: number,
}

export interface SaleData {
  client_id: number,
  car_id: number,
  price: number,
  date: string,
  manager_id: number,
}

export interface Sale extends SaleData {
  id: number,
}
