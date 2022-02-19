import { Component, OnInit } from '@angular/core';
import { getRegistered, Registered } from "./registered";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public registered: Registered<any>[];

  private modelName!: string;
  private routerSubscription!: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.registered = getRegistered();

    this.routerSubscription = route.params.subscribe(params => {
      this.modelName = params['modelName'];
    })
  }

  ngOnInit(): void {
  }
}
