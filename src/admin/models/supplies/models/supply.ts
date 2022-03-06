export interface SupplyData {
  car_id: number,
  amount: number,
  price: number,
  date: string,
}

export interface Supply extends SupplyData {
  id: number,
}
