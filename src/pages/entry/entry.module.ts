import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryPage } from './entry';

@NgModule({
  declarations: [
    EntryPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryPage),
  ],
  entryComponents: [
    EntryPage
  ]
})
export class EntryPageModule {}
