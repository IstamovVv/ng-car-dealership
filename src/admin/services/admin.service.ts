import { Injectable } from '@angular/core';
import { RegisteredService } from "./registered.service";
import { getKeyValue } from "../lib/scripts/common";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private registeredService: RegisteredService) {}

  getRegistered(modelName: string) {
    return getKeyValue(this.registeredService.registered)(modelName);
  }

  getRegisteredList() {
    return this.registeredService.registered;
  }
}
