import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { ManageProductSeriesComponent } from './manage-product-series/manage-product-series.component';
import { QRCodeModule } from "angularx-qrcode";
import { ProductSeriesScannerRoutingModule } from "./product-series-routing.module";
import { ProductSeriesDetailsPopupComponent } from "./product-series-detaills-popup/product-series-details-popup.component";
import { ProductSeriesFormPopupComponent } from "./product-series-form-popup/product-series-form-popup.component";
import { ProductSeriesScannerComponent } from "./product-series-scanner/product-series-scanner.component";

@NgModule({
  declarations: [
    ManageProductSeriesComponent,
    ProductSeriesScannerComponent,
    ProductSeriesFormPopupComponent,
    ProductSeriesDetailsPopupComponent
  ],
  imports: [
    CommonModule,
    ProductSeriesScannerRoutingModule,
    SharedModule,
    QRCodeModule
  ],
})
export class ProductSeriesModule { }
