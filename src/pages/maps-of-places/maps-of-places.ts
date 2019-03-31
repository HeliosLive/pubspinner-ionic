import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { PlaceList } from '../../models/PlaceList';
import { PlaceService } from '../../providers/place/place.service';
import { AssetsProvider } from '../../providers/assets/assets';
import { Distance } from '../../models/Distance';
import { MapPlaceDetail } from '../../models/MapPlaceDetail';

/**
 * Generated class for the MapsOfPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps-of-places',
  templateUrl: 'maps-of-places.html',
})
export class MapsOfPlacesPage {  
  localLat: number;
  localLng: number;
  agmIcon: any;
  placesList:MapPlaceDetail[]=[];  
  distance:Distance=new Distance();
  previous;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,     
    public geolocation: Geolocation,
    private launchNavigator:LaunchNavigator,
    private placeService:PlaceService,
    public assetService: AssetsProvider,
    public menu: MenuController) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsOfPlacesPage');
    this.getMapPosition();
    this.assetService.loadingShow("25km yakındaki tüm mekanlar yükleniyor.."); 
  }
 
  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

  goPlaceDetail(placeId:number) {
    this.assetService.presentToast('Mekan Detayları Yükleniyor..'); 
    this.navCtrl.push("PlaceDetailPage", { placeId: placeId }); //, passedWorkOrder: "test"
  }
  
  getMapPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => { 
      this.assetService.loadingDismiss();
      this.assetService.presentAlert("Konum Erişimi","Harita özelliğini kullanabilmek için lütfen konum servislerini açınız..");
       console.log('Error getting location', error);
     });
     
     const subscription = this.geolocation.watchPosition().subscribe((data) => {

      this.localLat = data.coords.latitude;
      this.localLng = data.coords.longitude;

      console.log('coords : ', data.coords); 
      console.log('coords lat : ', data.coords.latitude); 
      console.log('coords long : ', data.coords.longitude); 
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude 
      setTimeout(() => {   
        this.PlacesMapFilter(data.coords.latitude,data.coords.longitude);
       }, 1000);
     });

     //sürekli koordinat bilgisini çekmesin..
    setTimeout(() => {   
     subscription.unsubscribe();
    }, 10000);

  }

  PlacesMapFilter(lat:number,lng:number){   
    this.distance.Latitude = lat;
    this.distance.Longitude = lng;
    this.distance.MaxDistance = 0.09;   

    setTimeout(() => {   
    this.placeService.getPlacesMapFilter(this.distance).then((result: any) => { 
      if(result){
      console.log("iletilen data", result);
      this.placesList = result;
        // result.forEach(item => {
        //   if(item.Id){
        //     let place = new MapPlaceDetail();
        //     place = <MapPlaceDetail>{
        //         Id: item.Id,
        //         Name: item.Name,
        //         placeTypeName: item.placeTypeName,
        //         latitude: item.Latitude,
        //         longitude: item.Longitude,
        //         google_phone_number: item.google_phone_number,
        //         google_rating: item.google_rating
        //       }
        //   this.placesList.push(place); 
        //   }                       
        // }); 
        console.log(" this.placesList", this.placesList);
        this.assetService.loadingDismiss();
      }
      }).catch((err) => {
        this.assetService.loadingDismiss();
        console.log(err);
      });
    }, 1000);
  }

  goPlaceLocation(lat:number,lng:number,name:string){
    console.log("go location ", "hangi harita ile açılsın ?");
    let options: LaunchNavigatorOptions = {
      // app: this.launchNavigator.APP.GOOGLE_MAPS,
               start:[this.distance.Latitude,this.distance.Longitude]
        };
    this.launchNavigator.navigate([lat, lng],options)
    // this.launchNavigator.navigate([50.279306, -5.163158], {
    //   start: "50.342847, -4.749904"
    //  })
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })
  }

}
