import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WheelSpinnerPage } from './wheel-spinner';

@NgModule({
  declarations: [
    WheelSpinnerPage,
  ],
  imports: [
    IonicPageModule.forChild(WheelSpinnerPage),
  ],
})
export class WheelSpinnerPageModule {}
