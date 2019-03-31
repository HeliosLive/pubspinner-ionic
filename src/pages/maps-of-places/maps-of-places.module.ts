import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsOfPlacesPage } from './maps-of-places';
import { AgmCoreModule } from '@agm/core'; 

@NgModule({
  declarations: [
    MapsOfPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsOfPlacesPage),
    AgmCoreModule
  ],
})
export class MapsOfPlacesPageModule {}
