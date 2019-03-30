import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { PlaceService } from '../../providers/place/place.service';
import { PlaceDetail } from '../../models/PlaceDetail';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

/**
 * Generated class for the PlaceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {

  openingHours:string[] = [];
  isLiked:boolean=false;
  placeDetailModel:PlaceDetail= new PlaceDetail();
  passedPlaceId;
  _imageViewerCtrl: ImageViewerController;
  placeImages:string[] = [] 
  startLat: number;
  startLong: number;
  agmIcon: any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     imageViewerCtrl: ImageViewerController,
     private placeService : PlaceService,
     private launchNavigator:LaunchNavigator,
    @Inject("apiUrl") private apiUrl)
     {
      this._imageViewerCtrl = imageViewerCtrl;
      this.passedPlaceId = this.navParams.get('placeId');
     }

  ionViewDidLoad() {
    this.loadPlace();
  }

  location() {
    this.startLat = this.placeDetailModel.latitude;
    this.startLong = this.placeDetailModel.longitude;
    // this.agmIcon = "assets/images/beer.png"; 
  }

  changeLike(){
    this.isLiked = (this.isLiked == false ) ? true : false;
  }

  placeOpenHourReplace(){
    this.openingHours[0] = this.openingHours[0].replace("Monday","Pazartesi")
    this.openingHours[1] = this.openingHours[1].replace("Tuesday","Salı")
    this.openingHours[2] = this.openingHours[2].replace("Wednesday","Çarşamba")
    this.openingHours[3] = this.openingHours[3].replace("Thursday","Perşembe")
    this.openingHours[4] = this.openingHours[4].replace("Friday","Cuma")
    this.openingHours[5] = this.openingHours[5].replace("Saturday","Cumartesi")
    this.openingHours[6] = this.openingHours[6].replace("Sunday","Pazar");
  }

  loadPlace(){  
    this.placeService.getPlaceDetail(this.passedPlaceId).then((result: any) => { 
      console.log("iletilen mekan", result); 
          if(result){    
            this.placeDetailModel = result;
            this.placeImages = result.photos;
            this.openingHours = result.openingHours.split("//"); 
            if (this.openingHours != []) {
              this.openingHours.splice(0, 1);
              console.log(this.openingHours);
              this.placeOpenHourReplace();
           }
           if (this.placeDetailModel.latitude != null ) {
            this.location();
            console.log("harita yüklendi"); 
         }
          console.log("placeDetailModel ",this.placeDetailModel);  
          }     
      }).catch((err) => {
        console.log(err);
      });
  } 

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
 
    // setTimeout(() => imageViewer.dismiss(), 1000);
    // imageViewer.onDidDismiss(() => alert('Viewer dismissed'));
  }

  goPlaceLocation(){
    console.log("go location ", "hangi harita ile açılsın ?");
    let options: LaunchNavigatorOptions = {
      // app: this.launchNavigator.APP.GOOGLE_MAPS,
               start:[this.placeDetailModel.latitude,this.placeDetailModel.longitude]
        };
    this.launchNavigator.navigate('London, ON',options)
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })
  }

}
