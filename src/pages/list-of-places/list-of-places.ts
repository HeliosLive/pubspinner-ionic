import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular'; 
import { PlaceList } from '../../models/PlaceList';
import { AssetsProvider } from '../../providers/assets/assets';
import { PlaceService } from '../../providers/place/place.service';
import { PlaceDetail } from '../../models/PlaceDetail';

declare var require: any;
var MockServices = require('./../../MockDatas/PlaceList.json'); 

/**
 * Generated class for the ListOfPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-of-places',
  templateUrl: 'list-of-places.html',
})
export class ListOfPlacesPage {

  information: any[];
  loader: any
  IslacesList:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController, public assetService: AssetsProvider ,
    @Inject("apiUrl") private apiUrl,private placeService:PlaceService) {
      
  }
  
  getMockDataPlaces(){   
    MockServices.places.data.forEach(element => {
      this.places = new PlaceList(); 
      this.places.Id = element.Id;
      this.places.Name = element.Name; 
      this.places.Rating = element.Rating; 
      this.places.PlaceType = element.PlaceType; 
      this.placesList.push(this.places);
    }); 
  }

  infiniteScrollEnabled:boolean=true;
  infinityScroll:number=0;
  searchPlaces:string="";
  places:PlaceList;
  placesList:PlaceList[]=[];  
  placeTypeId:number[]=[0];  
  placeStar:number=0;

  ionViewDidLoad() {
    //this.getPlaces(); 
    this.assetService.loadingShow("Mekanlar Yükleniyor.."); 
    this.getAllPlaces();
  }

  doInfinite(event:any){
    this.infinityScroll ++;
    this.getAllPlaces(this.infinityScroll); 
      event.complete(); 
  }

  onCancelSearched(event:any){
    this.infinityScroll = 0;
    this.getAllPlaces(this.infinityScroll,"");
  }

  selectPlaceType(event:any){
    console.log("event",event);
    console.log("this.placeStar",this.placeStar);
  }

  changeInMacro(){
    this.searchPlaces = "";
    this.getSearchedPlaces();
  }

  getSearchedPlaces(){ 
    this.placesList = [];
    this.placeService.getPlaces(0,this.searchPlaces,this.placeTypeId,this.placeStar).then((result: any) => { 
      console.log("iletilen data", result);
        result.forEach(item => {
          if(item.id){
            let place = new PlaceList();
            place = <PlaceList>{
                Id: item.id,
                Name: item.name,
                PlaceType: item.placeTypeId,
                Rating: item.google_rating
              }
          this.placesList.push(place);
          console.log("placeList",this.placesList);
          // console.log(place);
          }            
        });  
        if(result.length == 0){
          this.IslacesList = true;
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  getAllPlaces(pageIndex?:number,searchString?:string){  
    searchString = (searchString == undefined) ? this.searchPlaces : searchString;
    pageIndex = (pageIndex > 0 ) ? pageIndex : 0; 
    
    this.placeService.getPlaces(pageIndex,searchString,this.placeTypeId,this.placeStar).then((result: any) => { 
      console.log("iletilen data", result);
        result.forEach(item => {
          if(item.id){
            let place = new PlaceList();
            place = <PlaceList>{
                Id: item.id,
                Name: item.name,
                PlaceType: item.placeTypeId,
                Rating: item.google_rating
              }
          this.placesList.push(place);
          // console.log(place);
          this.assetService.loadingDismiss();
          }                       
        }); 
        if(result.length == 0){
          this.IslacesList = true;
        }
      }).catch((err) => {
        this.assetService.loadingDismiss();
        console.log(err);
      });
  }

  goPlaceDetail(placeId:number) {
    this.assetService.presentToast('Mekan Detayları Yüklendi..');
    let ticketCategory = "";
    this.navCtrl.push("PlaceDetailPage", { placeId: placeId }); //, passedWorkOrder: "test"
  }
 
}


// this.placeService.getAllPlaces(0,aaa).subscribe(data => {
//   console.log(data);
//   console.log(JSON.stringify(data));
//   // this.placesList = JSON.parse(JSON.stringify(data._body));
//   this.placesList =  data._body ;
// },
// error =>{
//   console.log(error);
//   console.log(JSON.stringify(error));
// });