import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 
import { EntryPage } from '../pages/entry/entry'; 
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;  
  rootPage:any = TabsPage;
  public activePage: any;
  headerImage = "assets/images/watercolor.jpg";
 
 
  public pages: Array<{title: string, component: any, icon: string}>;
  public userPages: Array<{title: string, component: any, icon: string}>;
   
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // menu list navigation 
    this.userPages = [
      { title: 'Favorilerim', component: 'FavoritesPage', icon:"star" },
      { title: 'Profilim', component: 'ProfilePage', icon:"person" },
      { title: 'Ayarlar', component: 'SettingsPage', icon:"settings" }
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
    });
  }
}

