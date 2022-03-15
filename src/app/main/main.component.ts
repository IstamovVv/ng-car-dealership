import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout().subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    });
  }
}
