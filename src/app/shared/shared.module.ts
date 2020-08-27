import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LayoutsModule} from './layouts/layouts.module';
import {FocusInvalidInputDirective} from './directives/focus-invalid-input.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    FocusInvalidInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    LayoutsModule,
    NgxPaginationModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FocusInvalidInputDirective,
    NgxPaginationModule
  ]
})
export class SharedModule {
}
