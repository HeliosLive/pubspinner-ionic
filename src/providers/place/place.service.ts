import { Injectable, Inject } from "@angular/core";
import { AssetsProvider } from "../assets/assets";
import { Observable } from "rxjs/Observable";
import { PlaceDetail } from "../../models/PlaceDetail";
import { PlaceList } from "../../models/PlaceList";
import { Http, Headers, RequestOptions } from "@angular/http";
import { PlaceFilter } from "../../models/PlaceFilter";

@Injectable()
export class PlaceService {
  constructor(
    public assetService: AssetsProvider,
    @Inject("apiUrl") private apiUrl,
    public http: Http
  ) {}

  url: string = this.apiUrl + "/overall"; 

  getPlacePhotos(placeId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get( 'https://localhost:44309/api/photo/GetPhotoForPlace?' + "placeId=" +  placeId , { headers: headers })
        .subscribe(res => {
          resolve(res.json());
          // console.log("gelen datalar",res.json());
        },
          (err) => {
            console.log(err);
            reject(err);
            alert("WS Hatası: getReservation");
          })
    });
  }

  getPlaceByFilter(filter:PlaceFilter){
    debugger;
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      this.http.post( this.url + '/GetPlacesIdByFilter', filter , { headers: headers })
      // this.http.post( 'https://localhost:44309/api/overall/GetPlacesIdByFilter', filter , { headers: headers })
        .subscribe(res => {
          resolve(res.json());
           console.log("gelen datalar",res.json());
        },
          (err) => {
            console.log(err);
            reject(err);
            alert("Servise Ulaşılamadı");
          })
    });
  }

  getDistricts(cityId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get( this.url + '/GetDistricts?' + "cityId=" +  cityId , { headers: headers })
        .subscribe(res => {
          resolve(res.json());
           console.log("gelen datalar",res.json());
        },
          (err) => {
            console.log(err);
            reject(err);
            alert("Servise Ulaşılamadı");
          })
    });
  }

  getPlaceDetail(placeId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get( this.url + '/PlacesById?' + "placeId=" +  placeId , { headers: headers })
        .subscribe(res => {
          resolve(res.json());
          // console.log("gelen datalar",res.json());
        },
          (err) => {
            console.log(err);
            reject(err);
            alert("Servise Ulaşılamadı");
          })
    });
  }

  getPlaces(pageIndex: number,searchString:string,placeTypeId:number[],placeStar:number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + '/AllPlaces?' + "pageIndex=" + pageIndex 
      + "&placeName=" + searchString 
      + "&PlaceTypeId=" + placeTypeId 
      + "&PlaceStar=" + placeStar,{ headers: headers })
      // this.http.get( 'https://localhost:44309/api/overall/AllPlaces?' + "pageIndex=" + pageIndex + "&placeName=" + searchString, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
          // console.log("gelen datalar",res.json());
        },
          (err) => {
            console.log(err);
            reject(err);
            alert("Servise Ulaşılamadı");
          })
    });
  }
  //   getCategories ():Observable<Category[]>{
  //     return this.htpp.get(this.url).map(response=>response.json());
  // }

  // getInventory(barcode) {
  //     let headers = new Headers();
  //     headers.append('Accept', 'application/json');
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //     return this.http.post(localStorage.getItem("usedURL") + "/doselect", JSON.stringify({
  //       "SessionId": this.accountAuthServiceProvider.getSessionId(),
  //       "TableName": "Inventory",
  //       "FieldList": ["Id", "BarcodeNumber", "SerialNumber", "Product", "ProductCode", "ProductId", "HasSerialNumberCorrected", "CustomerReferenceNo",
  //         "InventoryOwner", "MainCustomerID", "DeviceHostName", "DeviceLanIp"],
  //       "FilterList": ["BarcodeNumber", "=", barcode, "OR", "SerialNumber", "=", barcode, "OR", "CustomerReferenceNo", "=", barcode],
  //       "OrderList": ["Id", "DESC"],
  //       "PageSize": "500",
  //       "CurrentPage": "1"
  //     }), { headers: headers })
  //       .map(res => res.json())
  //       .map(inv => {
  //         return inv;
  //       });
  //   }


}
