import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PicturesComponent } from './pictures/pictures.component';
import { PicturesRoutingModule } from './pictures.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicturesModalComponent } from './components/pictures-modal/pictures-modal.component';


@NgModule({
  imports: [
    CommonModule,
    PicturesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    PicturesComponent,
    PicturesModalComponent
  ],
  providers: []
})
export class PicturesModule { }
