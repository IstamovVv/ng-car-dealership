import { Injectable } from '@angular/core';
import { ModelsService } from "../../../services/models.service";
import { Supplier, SupplierData } from "../models/supplier";

@Injectable({
  providedIn: 'root'
})
export class SuppliersService extends ModelsService<Supplier, SupplierData> {
  path = 'suppliers'
}
