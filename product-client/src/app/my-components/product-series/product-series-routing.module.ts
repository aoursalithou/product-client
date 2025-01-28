import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ProductSeriesScannerComponent } from "./product-series-scanner/product-series-scanner.component";
import { ManageProductSeriesComponent } from "./manage-product-series/manage-product-series.component";

export const productSeriesRoutes: Routes = [
  {
    path: 'manage-product-series', canActivate: [AuthenticationGuard], component: ManageProductSeriesComponent, data: {
      label: 'Manage product Series',
      role: 'ROLE_ADMIN'
    },
  },
  {
    path: 'product-series-scanner', canActivate: [AuthenticationGuard], component: ProductSeriesScannerComponent, data: {
      label: 'Scan product Series',
      role: 'ROLE_ADMIN,ROLE_USER',
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(productSeriesRoutes)],
  exports: [RouterModule]
})
export class ProductSeriesScannerRoutingModule {

}
