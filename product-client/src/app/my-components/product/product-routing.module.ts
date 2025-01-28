import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ManageProductComponent } from "./manage-product.component";

export const productRoutes: Routes = [
  {
    path: 'manage-product', canActivate: [AuthenticationGuard], component: ManageProductComponent, data: {
      label: 'Manage products',
      role: 'ROLE_ADMIN'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
