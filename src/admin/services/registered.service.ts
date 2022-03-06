import { Injectable } from '@angular/core';
import { Sale } from "../models/sales/models/sale";
import { SuppliesService } from "../models/supplies/services/supplies.service";
import { Supply } from "../models/supplies/models/supply";
import { ModelsService } from "./models.service";
import { Manager } from "../models/managers/models/manager";
import { SuppliersService } from "../models/suppliers/services/suppliers.service";
import { ServiceLocator } from "./utils/locator.service";
import { ManagersService } from "../models/managers/services/managers.service";
import { ClientsService } from "../models/clients/services/clients.service";
import { Car } from "../models/cars/models/car";
import { SalesService } from "../models/sales/services/sales.service";
import { Supplier } from "../models/suppliers/models/supplier";
import { Client } from "../models/clients/models/client";
import { CarsService } from "../models/cars/services/cars.service";

interface IRegisteredParams<T, TData> {
  name              : string;
  path              : string;
  service           : ModelsService<T, TData>;
  fields            : string[];
  calculatedFields  : string[];
}

export class Registered<T, TData=Partial<T>> {
  name              : string;
  path              : string;
  service           : ModelsService<T, TData>;
  fields            : string[];
  calculatedFields  : string[];

  constructor(public data: IRegisteredParams<T, TData>) {
    this.name             = data.name;
    this.path             = data.path;
    this.service          = data.service;
    this.fields           = data.fields;
    this.calculatedFields = data.calculatedFields;
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
        name              : 'Clients',
        path              : 'clients',
        service           : ServiceLocator.injector.get(ClientsService),
        fields            : ['firstName', 'lastName', 'patronymic', 'address', 'identityDocNum'],
        calculatedFields  : ['id'],
      }),
      managers: new Registered<Manager>({
        name              : 'Managers',
        path              : 'managers',
        service           : ServiceLocator.injector.get(ManagersService),
        fields            : ['firstName', 'lastName', 'patronymic', 'address', 'identityDocNum'],
        calculatedFields  : ['id'],
      }),
      suppliers: new Registered<Supplier>({
        name              : 'Suppliers',
        path              : 'suppliers',
        service           : ServiceLocator.injector.get(SuppliersService),
        fields            : ['name'],
        calculatedFields  : ['id'],
      }),
      cars: new Registered<Car>({
        name              : 'Cars',
        path              : 'cars',
        service           : ServiceLocator.injector.get(CarsService),
        fields            : ['supplierId', 'model'],
        calculatedFields  : ['id'],
      }),
      supplies: new Registered<Supply>({
        name              : 'Supplies',
        path              : 'suppliers',
        service           : ServiceLocator.injector.get(SuppliesService),
        fields            : ['carId', 'amount', 'price', 'data'],
        calculatedFields  : ['id'],
      }),
      sales: new Registered<Sale>({
        name              : 'Sales',
        path              : 'sales',
        service           : ServiceLocator.injector.get(SalesService),
        fields            : ['clientId', 'carId', 'price', 'date', 'managerId'],
        calculatedFields  : ['id'],
      })
    }
  }
}
