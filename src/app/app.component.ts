import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 
import { EntryPage } from '../pages/entry/entry'; 
import { TabsPage } from '../pages/tabs/tabs';

import { timer } from 'rxjs/observable/timer';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;  
  rootPage:any = TabsPage;
  public activePage: any;
  headerImage = "assets/images/logotransparan.png";
  showSplash = true;
 
  public pages: Array<{title: string, component: any, icon: string}>;
  public userPages: Array<{title: string, component: any, icon: string}>;
   
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // menu list navigation 
    this.userPages = [
      { title: 'Favorilerim', component: 'FavoritesPage', icon:"star" },
      { title: 'Profilim', component: 'ProfilePage', icon:"person" },
      { title: 'Haftanın En İyisi', component: 'SettingsPage', icon:"battery-charging" },
      { title: 'Popülerite', component: 'SettingsPage', icon:"flash" },
      { title: 'Ayarlar', component: 'SettingsPage', icon:"settings" },
      { title: 'Kullanım Kılavuzu', component: 'SettingsPage', icon:"book" }
    ];
      // menu list navigation when user Login
    this.pages = [
      { title: 'Kayıt Ol', component: 'TabsPage', icon:"key" },
      { title: 'Giriş Yap', component: 'MyAccountPage', icon:"log-in" }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide(); 
      timer(5000).subscribe(() => this.showSplash = false)
      // setTimeout(() => {
      //   this.showSplash = false; 
      // }, 7000);
    });
  }
}

