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

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, 
    public menu: MenuController, public navParams: NavParams) {

  } 

  ionViewWillEnter(){
    console.log("enter ! ");
  }

  ionViewDidLoad() { 
    console.log("view loaded ! ");
    this.getServices();
  }
  
  services:ServiceList;
  servicesList:ServiceList[]=[];

 
  getServices(){  
    MockServices.services.data.forEach(element => {
      this.services = new ServiceList(); 
      this.services.Id = element.Id;
      this.services.Name = element.Name;
      this.services.ImageUrl = element.ImageUrl;
      this.services.Count = element.Count; 
      this.servicesList.push(this.services);
      console.log(element);
    }); 
  }

}
