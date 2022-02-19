import { Injectable } from '@angular/core';
import { ModelsService } from "../../../services/models.service";
import { Sale, SaleData } from "../models/sale";

@Injectable({
  providedIn: 'root'
})
export class SalesService extends ModelsService<Sale, SaleData>{
  path = 'sales'
}
