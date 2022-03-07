import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = this.fb.group({
    firstName   : [''],
    lastName    : [''],
    patronymic  : [''],
    sex         : [''],
    birthDate   : [''],
    phone       : [''],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
