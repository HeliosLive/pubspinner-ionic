import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOfPlacesPage } from './list-of-places';

@NgModule({
  declarations: [
    ListOfPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOfPlacesPage),
  ],
})
export class ListOfPlacesPageModule {}
