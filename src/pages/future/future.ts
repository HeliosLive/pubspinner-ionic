import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FuturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-future',
  templateUrl: 'future.html',
})
export class FuturePage {

  futureList:string[]=
  ['Harita ile yakınınızdaki mekanları görebileceksiniz.',
   'Mekan detayında konum özelliği ile telefonunuzdaki herhangi bir harita uygulaması ile oraya yönlendirme.',
   'Mekanların Müzik,Menü bilgisi özellikleri ilave edilecek.',
   'Wheel Spinner` a ilave filtreler.',
   'Üye olma ve giriş yapma özellikleriyle istediğiniz mekanları favorilere ekleyebilme',
   'Mekan tipi çeşitlerinin arttırılması.'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuturePage');
  }

}
