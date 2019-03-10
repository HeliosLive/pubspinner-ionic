import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsOfPlacesPage } from './maps-of-places';

@NgModule({
  declarations: [
    MapsOfPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsOfPlacesPage),
  ],
})
export class MapsOfPlacesPageModule {}
