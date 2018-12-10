import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PreloadImageComponent } from './preload-image/preload-image.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  declarations: [
    PreloadImageComponent
  ],
  exports: [
    PreloadImageComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}