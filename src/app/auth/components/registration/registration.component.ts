import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../models/country";
import {ModalService} from "../../../../admin/components/utils/modal/services/modal.service";
import {Roles} from "../../models/roles";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  returnUrl!: string;
  countries!: Country[];

  registrationForm: FormGroup = this.fb.group({
    username    : [''],
    password    : [''],
    countryId   : [''],
    firstName   : [''],
    lastName    : [''],
    patronymic  : [''],
    phoneNumber : [''],
    isEnabled   : [''],
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private modal: ModalService,
              private authService: AuthService,
              private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countriesService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: () => {
        this.modal.show("Failed to load countries")
      },
    })
  }

  onSubmit() {
    const data = this.registrationForm.getRawValue();
    data.role = Roles.User;
    data.isEnabled = true;

    this.authService.register(data).subscribe({
      next: (response) => {
        this.modal.show('You are successfully signed up!', () => {
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        this.modal.show(error.error.error);
      }
    })
  }
}
