import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './shared/layouts/wrapper/wrapper.component';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'schemes', pathMatch: 'full'},
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'schemes',
        loadChildren: () => import('./schemes/schemes.module').then(m => m.SchemesModule)
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
