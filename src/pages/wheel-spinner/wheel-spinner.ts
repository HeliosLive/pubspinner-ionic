import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import * as $ from "jquery";


/**
 * Generated class for the WheelSpinnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wheel-spinner',
  templateUrl: 'wheel-spinner.html',
})
export class WheelSpinnerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WheelSpinnerPage');
  }

  ngAfterViewInit(){
    $(document).ready(function(){
        //alert('JQuery is working!!');
    });
}

swipeEvent(event:any){  
  $(document).ready(function(){   
    $('#spinImg').clearQueue().delay(300).animate(
      { deg: 1800 },
      {
        duration: 5200,
        step: function(now) {
          $(this).css({ transform: 'rotate(' + now + 'deg)' });
        }
      }
    );
}); 
}
 
}
