import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule
  ],
  exports: [ 
    NavbarComponent
  ],
})
export class CoreModule { }
