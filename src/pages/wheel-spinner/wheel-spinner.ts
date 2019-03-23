import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ModalController
} from "ionic-angular";
import * as $ from "jquery";
import { AssetsProvider } from "../../providers/assets/assets";
import { PlaceService } from "../../providers/place/place.service";
import { PlaceFilter } from "../../models/PlaceFilter";
import { Distance } from "../../models/Distance";
import { PlaceDetailPage } from "../place-detail/place-detail";

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
  placeStar:number=3; 
  placeDistance:number = 30 ;
  placeTypeId : number=1;
  districtList:number[];
  districtId:any[]=[];
  filter:PlaceFilter = new PlaceFilter();
  distance:Distance = new Distance();
  returnPlaceId:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public assetService: AssetsProvider,
    private placeService: PlaceService,
    public modalCtrl: ModalController
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
    this.filter.cities = 1; // cityId şimdilik istanbul 
    this.filter.districts = this.districtId;
    this.filter.placeStar = this.placeStar;
    this.filter.distances.Latitude = 40.9731761; // buraya geolocation infos gelcek
    this.filter.distances.Longitude = 28.7257059; // buraya geolocation infos gelcek
    this.filter.distances.MaxDistance = this.placeDistance;
    this.filter.placeTypes = this.placeTypeId;
 
    setTimeout(() => {   
      this.placeService.getPlaceByFilter(this.filter).then((result: any) => {  
            if(result){    
              this.returnPlaceId = result; 
              this.presentModal();
              this.swipeEventLast();
            console.log("result ",result);   
            console.log("returnPlaceId ",this.returnPlaceId);   
            }     
        }).catch((err) => {
          this.swipeEventLast();
          console.log(err);
        }); 
    }, 700);
 
}
 
presentModal() {
  this.assetService.presentToast('Çarktan gelen mekan detayı'); 
  this.navCtrl.push("PlaceDetailPage", { placeId: this.returnPlaceId }); //, passedWorkOrder: "test"
}

swipeEventLast() { 
  $(document).ready(function() {
    $({ deg: 0 }).animate(
      { deg: 1800 },
      {
        duration: 300,
        step: function(now) {
          $("#spinImg").css({
            transform: "rotate(" + now + "deg)"
          });
        }
      }
    );
  }); 
}

  swipeEvent(event: any) {
    this.getPlaceByFilter();
    $(document).ready(function() {
      $({ deg: 0 }).animate(
        { deg: 1800 },
        {
          duration: 20000,
          step: function(now) {
            $("#spinImg").css({
              transform: "rotate(" + now + "deg)"
            });
          }
        }
      );
    });

  //   setTimeout(() => {
  //     this.assetService.presentToast(
  //       " Çarkı çevirdin ve bahtında xyz mekanı varmış ;) "
  //     );
  //   }, 3000);
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
