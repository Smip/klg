import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListViewComponent} from './list-view/list-view.component';
import {SchemesComponent} from './schemes.component';
import {SchemeAddEditComponent} from './scheme-add-edit/scheme-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SchemesComponent,
    children: [
      {
        path: '',
        component: ListViewComponent
      },
      {
        path: 'new',
        component: SchemeAddEditComponent
      },
      {
        path: ':id',
        component: SchemeAddEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemesRoutingModule {
}
