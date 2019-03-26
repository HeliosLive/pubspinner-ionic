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
import { mobiscroll, MbscSelectOptions } from '@mobiscroll/angular';

mobiscroll.settings = {
    theme: 'ios',
    lang: 'tr'
};


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
  isSpinAgain:boolean=true;
 
    wheel: number = 1;
    multiple: any = [1, 2, 9, 196, 200, 1008, 1009];
    select: any = [3, 4];
    group: any = [1, 2, 9, 196, 200, 1008, 1009];

   selectSettings: MbscSelectOptions = {
        select: 'multiple'
    };

    groupSettings: MbscSelectOptions = {
        select: 'multiple',
        label: 'Name',
        width: 50,
        group: true,
        groupLabel: '&nbsp;'
    };

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
              this.isSpinAgain = true;
              this.returnPlaceId = result; 
              this.presentModal();
              this.swipeEventLast();
            console.log("result ",result);   
            console.log("returnPlaceId ",this.returnPlaceId);   
            }    
        }).catch((err) => {
          this.assetService.presentAlert("Mekan Bulunamadı !","Üzgünüz Aradığınız Filtrelerde bir Mekan Bulunamadı ! Lütfen filtreleri düzenleyip Çarkı tekrar çeviriniz..");
          // alert("Üzgünüz Aradığınız Filtrelerde bir Mekan Bulunamadı ! Lütfen filtreleri düzenleyip Çarkı tekrar çeviriniz..");
          this.isSpinAgain = true;
          this.swipeEventLast();
          console.log(err);
        }); 
    }, 3000);
 
}
 
presentModal() {
  this.assetService.presentToast('Çarktan gelen mekan detayı'); 
  this.navCtrl.push("PlaceDetailPage", { placeId: this.returnPlaceId }); //, passedWorkOrder: "test"
}

  swipeEventLast() { 
    $(document).ready(function() {
      $({ deg: 0 }).animate(
        { deg: 360 },
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
    if(this.isSpinAgain == true){
        this.isSpinAgain = false;
    this.getPlaceByFilter();
      $(document).ready(function() {
        $({ deg: 0 }).animate(
          { deg: 1800 },
          {
            duration: 3000,
            step: function(now) {
              $("#spinImg").css({
                transform: "rotate(" + now + "deg)"
              });
            }
          }
        );
      });
    }
   

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
