import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ModelViewComponent } from "./components/model-view/model-view.component";
import { AddModelComponent } from "./components/add-model/add-model.component";
import { AdminComponent } from "./admin.component";
import { ModelsListComponent } from "./components/models-list/models-list.component";

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { path: '', component: ModelsListComponent },
      { path: ':modelName', component: ModelViewComponent },
      { path: 'add/:modelName', component: AddModelComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
