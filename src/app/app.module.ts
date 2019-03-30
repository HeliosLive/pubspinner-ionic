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
    IonicStorageModule.forRoot()
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
    Geolocation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
