import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import {ModalService} from "../../../admin/components/utils/modal/services/modal.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  constructor(private authService: AuthService,
              private modal: ModalService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userRole = this.authService.currentUserValue.role;
    const allowedRoles = route.data['roles'];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      this.modal.show('No Access');

      return false;
    }

    return true;
  }
}
