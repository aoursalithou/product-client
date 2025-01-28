import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductSeriesService } from 'src/services/product-series.service';
import { NotificationService } from 'src/services/notification.service';
import { ProductSeriesRequest } from 'src/transport/product-series.request';
import { GenericComponent } from '../../generic.component';
import { VerificationPopupComponent } from '../../verification-popup/verification-popup.component';
import { ProductSeriesFormPopupComponent } from '../product-series-form-popup/product-series-form-popup.component';

@Component({
  selector: 'app-manage-product-series',
  templateUrl: './manage-product-series.component.html',
  providers: [ProductSeriesService]
})
export class ManageProductSeriesComponent extends GenericComponent implements OnInit, OnDestroy {
  itemsPerPage: number = 9;
  allPages: number;
  tempList: any = [];

  constructor(
    private dialog: MatDialog,
    private productSeriesService: ProductSeriesService,
    private notificationService: NotificationService
  ) {
    super();
    this.req = new ProductSeriesRequest();
    this.req.$paging.$pageSize = 10;
  }

  ngOnInit() {
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.productSeriesService.getproductSeriesList(this.req)
      .subscribe(res => {
        this.modelList = res;
        this.tempList = res;
        this.onPageChange(1);
        this.allPages = Math.ceil(this.tempList.length / this.itemsPerPage);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onForm(id?: any) {
    const dialogRef = this.dialog.open(ProductSeriesFormPopupComponent, { disableClose: true, maxHeight: '100vh', width: '80vw', panelClass: 'custom-product-series-form-dialog-container' });
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'Your product series has been saved',
          });
      }
    });
  }

  onDeleteproductSeries(id: number) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      panelClass: 'custom-verification-dialog-container',
      data:
      {
        item: "Are you sure you want to delete product Series " +
          ' "' + this.selectedRow.
          productSeriesCode + '" ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.productSeriesService.deleteproductSeries(id)
          .subscribe(res => {
            if (res) {
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

  onSelectRow(item: any): void {
    this.selectedRow = item;
  }

  onPageChange(page: number): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.modelList = this.tempList.slice(startItem, endItem);
  }
}
