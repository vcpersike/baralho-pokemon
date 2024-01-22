import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";

import { TablesComponent } from "./views/admin/tables/tables.component";

// no layouts views
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts
import { AdminNavbarComponent } from "./components/navbars/admin-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin.component";

import { HeaderStatsComponent } from "./components/headers/header-stats.component";

import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PokemonService } from "./service/service.pokemon";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { PaginationControlComponent } from "./components/pagination-control/pagination-control.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    SidebarComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    AdminNavbarComponent,
    AdminComponent,
    TablesComponent,
    ProfileComponent,
    PaginationControlComponent,
    SpinnerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule, FormsModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
