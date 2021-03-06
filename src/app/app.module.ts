import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar'; 

import { MyApp } from './app.component'; 
import { EntryPage } from '../pages/entry/entry';
import { EntryPageModule } from '../pages/entry/entry.module';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core'; 
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { Storage, IonicStorageModule } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { AssetsProvider } from '../providers/assets/assets';
import { HttpModule } from '@angular/http';
import { PlaceService } from '../providers/place/place.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [ 
    FormsModule, 
    MbscModule,
    HttpModule,
    IonicImageViewerModule,
    BrowserModule,
    EntryPageModule, 
    TabsPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    // AgmSnazzyInfoWindowModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDJMobQnwX5yhSEkcHr-cK28azPTqo84X8" //TO DO projede paralı alınmış api olmalı bu 100 gösterimlik..
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    EntryPage,
    TabsPage
  ],
  providers: [
    // { provide: "apiUrl", useValue: "https://localhost:44309/api" },
    { provide: "apiUrl", useValue: "http://api.pubspinner.com/api" },
    StatusBar, 
    SplashScreen,
    AssetsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlaceService,
    Geolocation,
    LaunchNavigator
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
