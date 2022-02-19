import { Injectable } from '@angular/core';
import { Manager, ManagerData } from "../models/manager";
import { ModelsService } from "../../../services/models.service";

@Injectable({
  providedIn: 'root'
})
export class ManagersService extends ModelsService<Manager, ManagerData>{
  path = 'managers'
}
