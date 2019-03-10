import { Component, ViewChild } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
//provider 


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'EntryPage';
  tab2Root = 'ListOfPlacesPage';
  tab3Root = 'WheelSpinnerPage';
  tab4Root = 'MapsOfPlacesPage';
  tab5Root = 'LoginPage';
  
  @ViewChild('myTabs') tabRef: any;
  

  constructor(public popoverCtrl: PopoverController ) {
  
  }
  
  selectTab() {
    this.tabRef.select(2);
  }

  
}




