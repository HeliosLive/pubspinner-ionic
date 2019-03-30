import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceDetailPage } from './place-detail';
import { AgmCoreModule } from '@agm/core'; 

@NgModule({
  declarations: [
    PlaceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDetailPage),
    AgmCoreModule
  ],
})
export class PlaceDetailPageModule {}
