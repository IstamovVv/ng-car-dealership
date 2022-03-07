import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { nullUser } from "../../models/user";
import { first } from "rxjs";
import { ModalService } from "../../../../admin/components/utils/modal/services/modal.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl!: string;

  loginForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modal: ModalService
  ) {
    if (this.authService.currentUserValue !== nullUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {
    const data = this.loginForm.getRawValue();

    this.authService.login({
      username: data.login,
      password: data.password,
    }).pipe(first())
      .subscribe({
        next: data => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.modal.show(error);
        }
      })
  }
}
