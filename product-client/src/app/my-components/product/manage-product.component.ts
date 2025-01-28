import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Field } from 'src/transport/helper/table-fields.helper';
import { ProductRequest } from 'src/transport/product.request';
import { GenericComponent } from '../generic.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/services/notification.service';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';
import { ProductFormPopupComponent } from './product-form-popup/product-form-popup.component';


@Component({
  selector: 'app-product-table',
  templateUrl: './manage-product.component.html',
  providers: [ProductService]
})
export class ManageProductComponent extends GenericComponent implements OnInit, OnDestroy {
  filterOpened = false;
  productList: any = [];
  filteredproductList: any = [];
  productSeriesCodesList: any = [];
  filteredproductSeriesCodesList: any = [];
  dateFrom: Date;
  dateTo: Date;
  maxDate: Date;
  minDateFrom: Date;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    public datePipe: DatePipe,
    private notificationService: NotificationService
  ) {
    super();
    this.onReset();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.productService.fetchproducts().subscribe((data) => {
      this.productList = data;
      this.filteredproductList = data;
    }));
    this.subscriptions.add(this.productService.fetchproductsSeriesCodes().subscribe((data) => {
      this.productSeriesCodesList = data;
      this.filteredproductSeriesCodesList = data;
    }));
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.productService.getproductsList(this.req)
      .subscribe(res => {
        this.modelList = res.content;
        this.req.$paging.$totalSize = res.totalElements;
      }));
  }

  onSearch() {
    this.req.$purchaseDateFrom = this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd') as string;
    this.req.$purchaseDateTo = this.datePipe.transform(this.dateTo, 'yyyy-MM-dd') as string;
    this.onList();
  }

  onReset() {
    this.filteredproductList = this.productList;
    this.filteredproductSeriesCodesList = this.productSeriesCodesList
    this.req = new ProductRequest();
    this.req.$paging.$pageSize = 10;
    this.req.$paging.$orderField = Field.PRODUCT_NAME;
    this.req.$paging.$orderDirection = 'DESC';
    this.onList();
  }

  onDatePicker(event: any) {
    this.dateTo = null as any;
    if (event != null && this.dateFrom === null) {
      const tempDay = new Date();
      tempDay.setFullYear(event.getFullYear());
      tempDay.setMonth(event.getMonth());
      tempDay.setDate(event.getDate());
      this.minDateFrom = new Date(
        tempDay.setMonth(tempDay.getMonth() - 1)
      );
    }
  }
  onForm(id?: any) {
    const dialogRef = this.dialog.open(ProductFormPopupComponent, { disableClose: true, panelClass: 'custom-form-dialog-container' },);
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.productService.fetchproducts().subscribe((data) => {
          this.productList = data;
          this.filteredproductList = data;
        }));
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'Your product has been saved',
          });
      }
    });
  }

  onSelectRow(item: any): void {
    this.selectedRow = item;
  }

  onDeleteproduct(id: number) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      panelClass: 'custom-verification-dialog-container',
      data:
      {
        item: "Are you sure you want to delete" +
          ' "' + this.selectedRow.name + '" ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.productService.deleteproduct(id)
          .subscribe(res => {
            if (res) {
              this.subscriptions.add(this.productService.fetchproducts().subscribe((data) => {
                this.productList = data;
                this.filteredproductList = data;
              }));
              this.onList();
              this.notificationService.showNotification(
                {
                  title: 'Delete',
                  type: 'SUCCESS',
                  message: 'Your product has been deleted',
                });
            }
          }));
      }
    });
  }

  filterproductList(search: any) {
    this.filteredproductList = this.productList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase().toString()));
  }


  filterproductSeriesCodesList(search: any) {
    this.filteredproductSeriesCodesList = this.productSeriesCodesList.filter((item: any) => String(item.productSeriesCode).toLowerCase().includes(search.toLowerCase()))
  }

  onChangePaging(changePaging: any): void {
    this.req.$paging = changePaging;
    this.onList();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
