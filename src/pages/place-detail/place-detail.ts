import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject("apiUrl") private apiUrl) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailPage');
  }

}
