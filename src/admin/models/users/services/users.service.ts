import { Injectable } from '@angular/core';
import {ModelsService} from "../../../services/models.service";
import {User, UserData} from "../models/user";

import {environment as env} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ModelsService<User, UserData> {
  override url = env.BASE_AUTH_URL
  path = 'admin/users'
}
