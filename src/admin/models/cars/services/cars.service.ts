import { Injectable } from '@angular/core';
import { ModelsService } from "../../../services/models.service";
import { Car, CarData } from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class CarsService extends ModelsService<Car, CarData> {
  path = 'cars'
}
