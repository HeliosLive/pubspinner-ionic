import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import * as $ from "jquery";
import { AssetsProvider } from "../../providers/assets/assets";
import { PlaceService } from "../../providers/place/place.service";
import { PlaceFilter } from "../../models/PlaceFilter";
import { Distance } from "../../models/Distance";

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
  placeStar:number=0;
  placeDistance:number = 30 ;
  placeTypeId : number=0;
  districtList:number[];
  districtId:number[];
  filter:PlaceFilter = new PlaceFilter();
  distance:Distance = new Distance();
  returnPlaceId:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public assetService: AssetsProvider,
    private placeService: PlaceService
  ) {}

  ionViewDidLoad() {
    this.getDistricts(); 
    console.log("ionViewDidLoad WheelSpinnerPage");
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      //alert('JQuery is working!!');
    });
  }

  getDistricts(){ 
      this.placeService.getDistricts(1).then((result: any) => {  // cityId şimdilik istanbul 
            if(result){    
              this.districtList = result; 
            console.log("districtList ",this.districtList);   
            }     
        }).catch((err) => {
          console.log(err);
        }); 
  }

  getPlaceByFilter(){ 
    debugger;
    this.filter.cities = 1; // cityId şimdilik istanbul 
    this.filter.districts = this.districtId;
    this.filter.placeStar = this.placeStar;
    this.filter.distances.Latitude = 40.9731761; // buraya geolocation infos gelcek
    this.filter.distances.Longitude = 28.7257059; // buraya geolocation infos gelcek
    this.filter.distances.MaxDistance = this.placeDistance;
    this.filter.placeTypes = this.placeTypeId;
 
    this.placeService.getPlaceByFilter(this.filter).then((result: any) => {  
          if(result){    
            this.returnPlaceId = result; 
          console.log("result ",result);   
          console.log("returnPlaceId ",this.returnPlaceId);   
          }     
      }).catch((err) => {
        console.log(err);
      }); 
}

  swipeEvent(event: any) {
    debugger;
    this.getPlaceByFilter();
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
