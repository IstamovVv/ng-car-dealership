import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/services/auth.service";
import { Roles } from "../auth/models/roles";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id!: number;
  role!: string;
  username!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.currentUserValue;

    this.id = user.id;
    this.role = user.role;
    this.username = user.username;
  }
}
