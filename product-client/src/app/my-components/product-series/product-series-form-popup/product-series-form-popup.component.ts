import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QRCodeElementType } from 'angularx-qrcode';
import { ProductSeriesService,  } from 'src/services/product-series.service';
import { ProductSeriesRequest } from 'src/transport/product-series.request';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-product-series-form-popup',
  templateUrl: './product-series-form-popup.component.html',
  providers: [ProductSeriesService]
})
export class ProductSeriesFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  id: number;
  lastSelected: number;
  start: number;
  end: number;
  selected1productSet: Set<number> = new Set();
  selected2productSet: Set<number> = new Set();
  connectedProductsIds: Array<any> = [];
  filteredconnectedProductsIds: Array<any> = [];
  unconnectedProductsIds: Array<any> = [];
  filteredUnconnectedProductsIds: Array<any> = [];
  isAscUnconnectedProductsIds = false;
  isAscconnectedProductsIds = false;
  showInput: boolean = true;
  showGenerateQrButton = true;
  showQrCode: boolean = false;
  elementType = "canvas" as QRCodeElementType

  constructor(private productSeriesService: ProductSeriesService,
    private dialogRef: MatDialogRef<ProductSeriesFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new ProductSeriesRequest();
  }

  ngOnInit(): void {

    this.subscriptions.add(this.productSeriesService.fetchAvailableproducts().subscribe((data) => {
      this.sort(data, true);
      this.unconnectedProductsIds = data;
      this.filteredUnconnectedProductsIds = data;
    }));

    this.form = this.formBuilder.group({
      productSeriesCode: [null, Validators.required],
      filteredUnConnectedproduct: [null],
      filteredConnectedproduct: [null],
    });

    if (this.id) {
      // Fetch data from service
      this.subscriptions.add(this.productSeriesService.getById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              productSeriesCode: [res[0].productSeriesCode, Validators.required],
              filteredUnConnectedproduct: [null],
              filteredConnectedproduct: [null],
            });
            this.hideInputButtonShowQrCode();
            if (res[0].id != null) {
              for (const item of res) {
                this.connectedProductsIds.push(item);
              }
              this.filteredconnectedProductsIds = this.connectedProductsIds;
            }
          }
        }));
    }
  }

  hideInputButtonShowQrCode() {
    this.showInput = false;
    this.showGenerateQrButton = false;
    this.showQrCode = true;
  }

  hideQrCodeShowInputButton() {
    this.showQrCode = false;
    this.showInput = true;
    this.showGenerateQrButton = true;
    this.form.controls.productSeriesCode.patchValue('');
  }

  onSelectRowproduct(recordId: number, list: number, index: number, event?: any): void {
    // event ctrl +click
    if (event && event.ctrlKey) {
      this.lastSelected = index;
      if (list === 0) {
        (!this.selected1productSet.has(recordId))
          ? (this.selected1productSet.add(recordId))
          : (this.selected1productSet.delete(recordId));
      } else {
        (!this.selected2productSet.has(recordId))
          ? (this.selected2productSet.add(recordId))
          : (this.selected2productSet.delete(recordId));
      }
    }
    // event shift + click
    else if (event && event.shiftKey) {
      if (index < this.lastSelected) {
        this.start = index;
        this.end = this.lastSelected;
      } else {
        this.start = this.lastSelected;
        this.end = index;
      }
      if (list === 0) {
        for (let k = 0; k <= this.filteredUnconnectedProductsIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected1productSet.add(this.filteredUnconnectedProductsIds[k].id);
          }
        }
      } else {
        for (let k = 0; k <= this.filteredconnectedProductsIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected2productSet.add(this.filteredconnectedProductsIds[k].id);
          }
        }
      }
    } else {
      // click event
      this.lastSelected = index;
      if (list === 0) {
        if (this.selected1productSet.size === 0) {
          if (!this.selected1productSet.has(recordId)) {
            this.selected1productSet.add(recordId);
          }
        } else {
          // if selected1productet has one value and click different value
          this.selected1productSet.clear();
          this.selected1productSet.add(recordId);
        }
      } else {
        //  for  list 1
        if (this.selected2productSet.size === 0) {
          if (!this.selected2productSet.has(recordId)) {
            this.selected2productSet.add(recordId);
          }
        } else {
          // if selected2nstrumentSet has one value and click different value
          this.selected2productSet.clear();
          this.selected2productSet.add(recordId);
        }
      }
    }
  }

  onMoveproduct(direction: string, event?: any) {
    // because onMoveproduct is used without click event when edit pop up
    // it runs only for user click.
    if (event != null && event.type === 'click') {
      this.form.markAsDirty();
    }
    this.lastSelected = 0;
    this.start = 0;
    this.end = 0;
    const remainingsAddress: Array<any> = [];

    if (direction === 'RIGHT') {
      this.unconnectedProductsIds.forEach(rec => {
        if (this.selected1productSet.has(rec.id) && !this.recordExists(this.connectedProductsIds, rec.id)) {
          this.connectedProductsIds.push(rec);
          this.selected1productSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.unconnectedProductsIds = remainingsAddress;
      this.filteredUnconnectedProductsIds = remainingsAddress;
      this.filteredconnectedProductsIds = this.connectedProductsIds;
      this.filterUnconnectedProductsIds(
        this.form.value.filteredUnConnectedproduct ? this.form.value.filteredUnConnectedproduct : '');
      this.filterconnectedProductsIds(
        this.form.value.filteredConnectedproduct ? this.form.value.filteredConnectedproduct : '');
    } else {
      this.connectedProductsIds.forEach(rec => {
        if (this.selected2productSet.has(rec.id) && !this.recordExists(this.unconnectedProductsIds, rec.id)) {
          this.unconnectedProductsIds.push(rec);
          this.selected2productSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.connectedProductsIds = remainingsAddress;
      this.filteredconnectedProductsIds = remainingsAddress;
      this.filterUnconnectedProductsIds(
        this.form.value.filteredUnConnectedproduct ? this.form.value.filteredUnConnectedproduct : '');
      this.filterconnectedProductsIds(
        this.form.value.filteredConnectedproduct ? this.form.value.filteredConnectedproduct : '');
    }
    this.sort(this.filteredconnectedProductsIds, true);
    this.sort(this.filteredUnconnectedProductsIds, true);
  }

  private recordExists(list: any[], id: number): boolean {
    for (const item of list) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  sort(list: Array<any>, isAsc: boolean) {
    console.log(list, isAsc)
    if (isAsc) {
      list.sort((one, two) => (one.name < two.name ? -1 : 1));
    } else {
      list.sort((one, two) => (one.name < two.name ? 1 : -1));
    }
  }

  isSelectedproduct(record: any, list: number): boolean {
    if (list === 0) {
      return this.selected1productSet.has(record.id);
    } else {
      return this.selected2productSet.has(record.id);
    }
  }

  filterUnconnectedProductsIds(search: any) {
    this.selected1productSet.clear();
    this.filteredUnconnectedProductsIds = this.unconnectedProductsIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
  }

  filterconnectedProductsIds(search: any) {
    this.selected2productSet.clear();
    this.filteredconnectedProductsIds = this.connectedProductsIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
  }

  onSaveproductSeries() {
    // assign the form values to request
    this.req.$productSeriesCode = this.form.value.productSeriesCode;
    for (const item of this.unconnectedProductsIds) {
      this.req.$unconnectedProductsIds.push(item.id);
    }
    for (const item of this.connectedProductsIds) {
      this.req.$connectedProductsIds.push(item.id);
    }
    // call service for create / edit
    if (this.id) {
      this.req.$id = this.id;
      this.subscriptions.add(this.productSeriesService.updateproductSeries(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    } else {
      this.subscriptions.add(this.productSeriesService.createproductSeries(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  onSelect(recordId: number, list: number, tempSelectedOne: Set<number>, tempSelectedTwo: Set<number>) {
    if (list === 0) {
      if (tempSelectedOne.size === 0) {
        if (!tempSelectedOne.has(recordId)) {
          tempSelectedOne.add(recordId);
        }
      } else {
        tempSelectedOne.add(recordId);
      }
    } else {
      //  for  list 1
      if (tempSelectedTwo.size === 0) {
        if (!tempSelectedTwo.has(recordId)) {
          tempSelectedTwo.add(recordId);
        }
      } else {
        tempSelectedTwo.add(recordId);
      }
    }
  }

  saveAsImage(parent: any) {
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "Qrcode_" + this.form.controls.productSeriesCode.value;
      link.click()
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
