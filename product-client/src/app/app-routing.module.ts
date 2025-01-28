import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./my-components/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () => import('./my-components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () => import('./my-components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'product',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () => import('./my-components/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'product-series',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN,ROLE_USER'},
    loadChildren: () => import('./my-components/product-series/product-series.module').then(m => m.ProductSeriesModule)
  },
  { path: '**', redirectTo: '/notfound' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
