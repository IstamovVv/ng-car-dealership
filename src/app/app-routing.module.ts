import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { ModelsListComponent } from "./admin/models-list/models-list.component";
import { ModelViewComponent } from "./admin/model-view/model-view.component";

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: ModelsListComponent },
      { path: ':modelName', component: ModelViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
