import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchemesRoutingModule} from './schemes-routing.module';
import {SchemesComponent} from './schemes.component';
import {ListViewComponent} from './list-view/list-view.component';
import {SearchFormComponent} from './list-view/search-form/search-form.component';
import {SharedModule} from '../shared/shared.module';
import {SchemeAddEditComponent} from './scheme-add-edit/scheme-add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {SchemesService} from '../shared/services/schemes.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    SchemesComponent,
    ListViewComponent,
    SearchFormComponent,
    SchemeAddEditComponent
  ],
  imports: [
    CommonModule,
    SchemesRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule
  ],
  providers: [
    SchemesService
  ]
})
export class SchemesModule {
}
