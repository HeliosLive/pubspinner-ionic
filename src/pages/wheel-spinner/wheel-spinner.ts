import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import * as $ from "jquery";
import { AssetsProvider } from "../../providers/assets/assets";

/**
 * Generated class for the WheelSpinnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-wheel-spinner",
  templateUrl: "wheel-spinner.html"
})
export class WheelSpinnerPage {
  rotation: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public assetService: AssetsProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad WheelSpinnerPage");
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      //alert('JQuery is working!!');
    });
  }

  swipeEvent(event: any) {
    $(document).ready(function() {
      $({ deg: 0 }).animate(
        { deg: 1800 },
        {
          duration: 4000,
          step: function(now) {
            $("#spinImg").css({
              transform: "rotate(" + now + "deg)"
            });
          }
        }
      );
    });

    setTimeout(() => {
      this.assetService.presentToast(
        " Çarkı çevirdin ve bahtında xyz mekanı varmış ;) "
      );
    }, 3000);
  }
}

/* JUST TRIGGER ONCE ! 

    // $('#spinImg').animate(
    //   { deg: 1800 },
    //   {
    //     queue: false,
    //     duration: 500,
    //     step: function(now) {
    //       $(this).css({ transform: 'rotate(' + now + 'deg)' });
    //     }
    //   }
    // ); 
    
*/
