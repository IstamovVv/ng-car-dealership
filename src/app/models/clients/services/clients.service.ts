import { Injectable } from '@angular/core';
import { Client, ClientData } from "../models/client";
import { ModelsService } from "../../../services/models.service";

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends ModelsService<Client, ClientData>  {
  path = 'clients'
}
