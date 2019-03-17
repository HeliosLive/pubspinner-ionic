import { GenelModel } from "./GenelModel";
import { Photo } from "./Photo";
import { Review } from "./Review";

export class PlaceDetail {
    active:boolean;
    address:string;
    city:GenelModel;
    district:GenelModel;
    favoriteCount:number;
    google_phone_number:string;
    google_place_id:string;
    google_rating:number;
    google_rating_votes:number; 
    id:Number;
    latitude:number;
    longitude:number;
    name:string;
    openingHours:string;
    photos:Photo[];
    placeReviews:Review[];
    placeType:GenelModel;
    website:string; 
} 