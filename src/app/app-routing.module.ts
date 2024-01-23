import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./layouts/admin.component";


import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { TablesComponent } from "./views/tables/tables.component";
import { EditarComponent } from "./components/cards/card-editar/card-editar.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "tables", component: TablesComponent },
      { path: "editar/:id", component: EditarComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
