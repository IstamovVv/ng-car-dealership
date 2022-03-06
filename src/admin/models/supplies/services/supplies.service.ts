import { Injectable } from '@angular/core';
import { ModelsService } from "../../../services/models.service";
import { Supply, SupplyData } from "../models/supply";

@Injectable({
  providedIn: 'root'
})
export class SuppliesService extends ModelsService<Supply, SupplyData>{
  path = 'supplies'
}
