import { Component, OnInit } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Client } from "./models/clients/models/client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-angular-project';

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.get<Client[]>('clients', 0, 10).subscribe((data: Client[]) => {
      console.log(data)
    })

  }
}
