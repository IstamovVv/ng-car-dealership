import { Injectable } from '@angular/core';
import { Client } from "../../models/clients/models/client";
import { ServiceLocator } from "../../services/locator.service";
import { ClientsService } from "../../models/clients/services/clients.service";
import { Manager } from "../../models/managers/models/manager";
import { ManagersService } from "../../models/managers/services/managers.service";
import { Supplier } from "../../models/suppliers/models/supplier";
import { SuppliersService } from "../../models/suppliers/services/suppliers.service";
import { Car } from "../../models/cars/models/car";
import { CarsService } from "../../models/cars/services/cars.service";
import { Supply } from "../../models/supplies/models/supply";
import { SuppliesService } from "../../models/supplies/services/supplies.service";
import { Sale } from "../../models/sales/models/sale";
import { SalesService } from "../../models/sales/services/sales.service";
import { ModelsService } from "../../services/models.service";

interface IRegisteredParams<T, TData> {
  name    : string;
  path    : string;
  service : ModelsService<T, TData>;
  fields  : string[];
}

export class Registered<T, TData=Partial<T>> {
  name    : string;
  path    : string;
  service : ModelsService<T, TData>;
  fields  : string[];

  constructor(public data: IRegisteredParams<T, TData>) {
    this.name     = data.name;
    this.path     = data.path;
    this.service  = data.service;
    this.fields   = data.fields;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RegisteredService {
  public readonly registered: Record<string, Registered<any>>;

  constructor() {
    this.registered = {
      clients: new Registered<Client>({
        name: 'Clients',
        path: 'clients',
        service: ServiceLocator.injector.get(ClientsService),
        fields: ['id', 'firstName', 'lastName', 'patronymic', 'address', 'identityDocNum'],
      }),
      managers: new Registered<Manager>({
        name: 'Managers',
        path: 'managers',
        service: ServiceLocator.injector.get(ManagersService),
        fields: ['id', 'firstName', 'lastName', 'patronymic', 'address', 'identityDocNum'],
      }),
      suppliers: new Registered<Supplier>({
        name: 'Suppliers',
        path: 'suppliers',
        service: ServiceLocator.injector.get(SuppliersService),
        fields: ['id', 'name'],
      }),
      cars: new Registered<Car>({
        name: 'Cars',
        path: 'cars',
        service: ServiceLocator.injector.get(CarsService),
        fields: ['id', 'supplierId', 'model'],
      }),
      supplies: new Registered<Supply>({
        name: 'Supplies',
        path: 'suppliers',
        service: ServiceLocator.injector.get(SuppliesService),
        fields: ['id', 'carId', 'amount', 'price', 'data'],
      }),
      sales: new Registered<Sale>({
        name: 'Sales',
        path: 'sales',
        service: ServiceLocator.injector.get(SalesService),
        fields: ['id', 'clientId', 'carId', 'price', 'date', 'managerId'],
      })
    }
  }
}
