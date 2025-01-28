import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { productRoutes } from './my-components/product/product-routing.module';
import { productSeriesRoutes } from './my-components/product-series/product-series-routing.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  productRoutes = productRoutes;
  productSeriesRoutes = productSeriesRoutes;
  title = 'product-client';
  isSidebarOpened: boolean;
  currentRoute: any = 'Home';

  role: string;
  public menuItems: any = [];

  constructor(
    public router: Router, private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRoute = event;
        if (this.router.url.includes('user')) {
          this.menuItems = null;
        }
        if (this.router.url.includes('product')) {
          this.menuItems = this.productRoutes;
        }
        if (this.router.url.includes('product-series')) {
          this.menuItems = this.productSeriesRoutes;
        }
      });

    this.authenticationService.changes.subscribe(role => this.role = role);
  }

  onGetIsSideBarOpened(data: boolean) {
    this.isSidebarOpened = data;
  }
}
