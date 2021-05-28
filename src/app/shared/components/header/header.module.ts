import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ModalModule } from '../modal/modal.module';
import { AboutModule } from '../about/about.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    AboutModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
