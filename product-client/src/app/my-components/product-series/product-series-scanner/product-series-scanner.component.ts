import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductSeriesService } from 'src/services/product-series.service';
import { GenericComponent } from '../../generic.component';
import { ProductSeriesDetailsPopupComponent } from '../product-series-detaills-popup/product-series-details-popup.component';

@Component({
  selector: 'app-product-series-scanner',
  templateUrl: './product-series-scanner.component.html',
  providers: [ProductSeriesService]

})
export class ProductSeriesScannerComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor(
    private productSeriesService: ProductSeriesService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onFetchproductsByproductSeriesCode(qrCode: string) {
    this.subscriptions.add(this.productSeriesService.fetchproductsByproductSeriesCode(qrCode)
      .subscribe(res => {
        this.modelList = res;
        this.onproductSeriesDetails()
      }
      )
    );
  }

  onproductSeriesDetails() {
    const dialogRef = this.dialog.open(ProductSeriesDetailsPopupComponent, {
      panelClass: 'custom-form-dialog-container',
      data:
      {
        item: this.modelList
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
