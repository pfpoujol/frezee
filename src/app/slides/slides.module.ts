import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { SlidesPageRoutingModule } from './slides-routing.module';

import { SlidesPage } from './slides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlidesPageRoutingModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations: [SlidesPage]
})
export class SlidesPageModule {}
