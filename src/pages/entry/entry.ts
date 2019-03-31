import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, NavParams, IonicPage} from 'ionic-angular';
import { ServiceList } from '../../models/ServiceList';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { timer } from 'rxjs/observable/timer';
import { AssetsProvider } from '../../providers/assets/assets';

declare var require: any;
var MockServices = require('./../../MockDatas/ServiceList.json'); 

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  showSplash = true;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, 
    public geolocation: Geolocation,public assetService: AssetsProvider ,
    public menu: MenuController, public navParams: NavParams,) {

  } 

  ionViewWillEnter(){
    timer(5000).subscribe(() => this.showSplash = false)
  }

  ionViewDidLoad() { 
    this.getServices();
    this.getMain(); 
    this.getMapPosition();
  }
  
  services:ServiceList;
  servicesList:ServiceList[]=[];
  mainList:ServiceList[]=[];

 
  getServices(){  
    MockServices.services.data.forEach(element => {
      this.services = new ServiceList(); 
      this.services.Id = element.Id;
      this.services.Name = element.Name;
      this.services.ImageUrl = element.ImageUrl;
      this.services.Count = element.Count; 
      this.servicesList.push(this.services);
    }); 
  }

  getMain(){
    MockServices.services.main.forEach(element => {
      this.services = new ServiceList(); 
      this.services.Id = element.Id;
      this.services.Name = element.Name;
      this.services.ImageUrl = element.ImageUrl;
      this.services.Description = element.Description; 
      this.services.Description2 = element.Description2; 
      this.mainList.push(this.services);
    }); 
  }

  getMapPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
       this.assetService.presentAlert("Konum Erişimi","Uygulamanın tüm özelliklerini kullanabilmek için lütfen konum servislerini açınız..");
     });
     
     const subscription = this.geolocation.watchPosition().subscribe((data) => {
      console.log('coords : ', data.coords); 
      console.log('coords lat : ', data.coords.latitude); 
      console.log('coords long : ', data.coords.longitude); 
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude  
     });

     //sürekli koordinat bilgisini çekmesin..
    setTimeout(() => {   
     subscription.unsubscribe();
    }, 10000);

  }

}
