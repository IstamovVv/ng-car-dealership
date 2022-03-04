import { Component, OnInit } from '@angular/core';
import { AdminService } from "../services/admin.service";
import { Registered } from "../services/registered.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  public readonly registered: Record<string, Registered<any>>;

  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute) {

    this.registered = adminService.getRegisteredList();
  }


  ngOnInit(): void {

  }

  goToModelView(commands: string[]) {
    this.router.navigate(commands, { relativeTo: this.route });
  }
}
