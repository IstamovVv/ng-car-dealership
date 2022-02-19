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
