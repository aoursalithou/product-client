import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-series-details-popup',
  templateUrl: './product-series-details-popup.component.html',
})
export class ProductSeriesDetailsPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductSeriesDetailsPopupComponent>) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  onClose() {
    this.dialogRef.close();
  }
}
