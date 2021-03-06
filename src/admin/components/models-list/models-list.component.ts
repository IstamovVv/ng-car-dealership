import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";
import { Registered } from "../../services/registered.service";

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
}
