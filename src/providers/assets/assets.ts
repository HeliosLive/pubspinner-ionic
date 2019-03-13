import { Injectable } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { Toast } from 'ionic-angular/components/toast/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class AssetsProvider {
  loading;

  constructor(public loadingCtrl: LoadingController, 
  public toastCtrl: ToastController, 
  public alertCtrl: AlertController,
  private platform:Platform) {
  }
  loadingShow(title:string) {
    this.loading = this.loadingCtrl.create({
      content: title
    });
    this.loading.present();
  }

  loadingDismiss() {
    this.loading.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  presentAlert(title,subTitle) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: subTitle,
    buttons: ['Tamam']
  });
  alert.present();
}

presentAlertforPrinter(title,subTitle,message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: subTitle,
    message:message,
    buttons: ['Tamam']
  });
  alert.present();
}

// toDateforSoap(value){

//     var dateStr = value.replace('T', ' ');
//      var dateStr2 = dateStr.replace('Z', ' ');
//      var  parts = dateStr2.split("-");
//      var part2 = parts[2].split(" ")

//     var finalDateString = part2[0] + '.' + parts[1] + '.' +  parts[0].slice(-2) + " " + part2[1]
//     return finalDateString.toString();
  
// }


//VERSİYON KONTROL !! GELİŞTİRELECEK !!
// isForceUpgrade():boolean{

//   let isforceUpgrade:boolean=false;
//   if(localStorage.getItem('urlStatus')=='1'){
//     this.accountAuthServiceProvider.checkAppVersion().subscribe(res=>{
//     var result= res.json();
//     console.log(result);
//     if(result.ECode==200 && result.forceUpgrade==true){
//       isforceUpgrade=true;
//     }})
//   }    
//   return isforceUpgrade;
// }


// chcekAppVersion(){
//   if(localStorage.getItem('urlStatus')=='1'){
//                 this.accountAuthServiceProvider.checkAppVersion().subscribe(res=>
//                 {
//                 var result= res.json();
//                 console.log(result);

//                 if(result.ECode==200 && result.forceUpgrade==true)
//                 {
//                   let confirm = this.alertCtrl.create({
//                   title: 'Yeni güncellemeler mevcut',
//                   message: 'Yüklemeniz gerekmektedir!',
//                   enableBackdropDismiss:false,
//                   buttons: [
//                     {
//                       text: 'Hayır',
//                       handler: () => {
//                         console.log('Disagree clicked');
//                         this.platform.exitApp();
//                       }
//                     },
//                     {
//                       text: 'Tamam',
//                       handler: () => {
//                         this.market.open("com.bdh.emptormobile");
//                         //this.navCtrl.setRoot(AccLoginPage);
                        
//                       }
//                     }
//                   ]
//                 });
//                 confirm.present();      
//                 }
//           })
//      }  
// }


disableBackButon(){
  this.platform.registerBackButtonAction(() => {
    this.platform.exitApp();
  },1);
}

convenrtStringToDate(stringValue){
    var part1= stringValue.split('.');
      var part2= part1[2].split(' ');
      var part3= part2[1].split(':');
      var result = part2[0]+'-'+part1[1]+'-'+part1[0]+'T'+part2[1]+'Z';
    return result;
  }

  
public presentConfirm = {
  confirm: (title,msg,inputs,cancelText,confirmText) => {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: msg,
        inputs:inputs,
        
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              reject(false);
            }
          },
          {
            text: confirmText,
            handler: (data) => {
              resolve(data);
            }
          }
        ]
      });
      alert.present();
    });

  },
  alert: (msg, title?) => {
    let alert = this.alertCtrl.create({
      title: title || 'Alert',
      subTitle: msg,
      buttons: ['Dismiss']
    });

    alert.present();
  }
}
 
}
