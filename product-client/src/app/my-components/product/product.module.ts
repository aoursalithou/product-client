import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { ProductRoutingModule } from "./product-routing.module";
import { ManageProductComponent } from "./manage-product.component";
import { ProductFormPopupComponent } from './product-form-popup/product-form-popup.component';


@NgModule({
  declarations: [
    ManageProductComponent,
    ProductFormPopupComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ],
})
export class ProductModule { }

