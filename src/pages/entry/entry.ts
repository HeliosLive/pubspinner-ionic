import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, NavParams, IonicPage} from 'ionic-angular';
import { ServiceList } from '../../models/ServiceList';

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
    public menu: MenuController, public navParams: NavParams,) {

  } 

  ionViewWillEnter(){
  }

  ionViewDidLoad() { 
    this.getServices();
    this.getMain();
    setTimeout(() => {
      this.showSplash = false; 
    }, 7200);
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

}
