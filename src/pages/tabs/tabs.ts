import { Component, ViewChild } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
//provider 

import { timer } from 'rxjs/observable/timer';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  showSplash = true;
  
  tab1Root = 'EntryPage';
  tab2Root = 'ListOfPlacesPage';
  tab3Root = 'WheelSpinnerPage';
  tab4Root = 'MapsOfPlacesPage';
  tab5Root = 'FuturePage';
  
  @ViewChild('myTabs') tabRef: any;
  

  constructor(public popoverCtrl: PopoverController ) {
  
  }
  
  ionViewWillEnter(){
    timer(4500).subscribe(() => this.showSplash = false)
  }

  selectTab() {
    this.tabRef.select(2);
  }

  
}




