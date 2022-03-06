export interface CarData {
  supplier_id: number,
  model: string,
}

export interface Car extends CarData{
  id: number,
}
