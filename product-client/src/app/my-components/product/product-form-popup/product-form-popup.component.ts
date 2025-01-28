import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/services/product.service';
import { ProductRequest } from 'src/transport/product.request';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-product-form-popup',
  templateUrl: './product-form-popup.component.html',
  providers: [ProductService],
})
export class ProductFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  id: any;
  productPurchaseDate: Date;
  form: UntypedFormGroup;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new ProductRequest();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productName: [null, Validators.required],
      productDescription: [null],
      productRef: [null, Validators.required],
      productLot: [null, Validators.required],
      productManufacturer: [null, Validators.required],
      productPurchaseDate: [null, Validators.required],
      productNotes: [null],
    });

    if (this.id) {
      this.subscriptions.add(this.productService.getproductById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              productName: [res.name, Validators.required],
              productDescription: [res.description],
              productRef: [res.productRef, Validators.required],
              productLot: [res.productLot, Validators.required],
              productManufacturer: [res.productManufacturer, Validators.required],
              productPurchaseDate: [res.productPurchaseDate, Validators.required],
              productNotes: [res.productNotes]
            });
          }
        }));
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSaveproduct() {
    this.req.$id = this.id;
    this.req.$name = this.form.value.productName;
    this.req.$description = this.form.value.productDescription;
    this.req.$productRef = this.form.value.productRef;
    this.req.$productLot = this.form.value.productLot;
    this.req.$productManufacturer = this.form.value.productManufacturer;
    this.req.$productPurchaseDate = this.form.value.productPurchaseDate;
    this.req.$productNotes = this.form.value.productNotes;
    if (this.id) {
      this.subscriptions.add(this.productService.updateproduct(this.req).subscribe(
        res => {
          this.dialogRef.close(this.id);
        }
      ));
    } else {
      this.subscriptions.add(this.productService.createproduct(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
