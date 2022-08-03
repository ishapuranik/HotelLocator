import { Injectable } from '@angular/core';

import { empty, Observable, Subject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { IHotelData, HotelDataResponse } from 'src/app/models/hotels-data.model'
import { HotelApiEndpoint } from './hotel-api-endpoint.service';

@Injectable({
    providedIn: 'root'
})

export class HotelService {
    private currentHotelData: HotelDataResponse = new HotelDataResponse(null, null);
    private currentHotelDataSource = new Subject<HotelDataResponse>();

    public currentHotelData$ = this.currentHotelDataSource.asObservable();
   
    constructor(private hotelEndpoint: HotelApiEndpoint
        ) { }

    public getHotelData() {
        this.getHotelDataObservable().subscribe();
    }

    public getHotelFilterData(hotelName: string, rating: number) {
        this.getHotelFilterDataObservable(hotelName, rating).subscribe();
    }

    //Todo: remove endpoint ts code and move it to hotel service
    public getHotelDataObservable() {
        return this.hotelEndpoint.getHotelDataEndpoint<any[]>();
         
    }

    public getHotelFilterDataObservable(hotelName: string, rating?: number) {
        var hotelList: any[] = [];

        return this.hotelEndpoint.getHotelSearchByNameOrRatingDataEndpoint(hotelName, rating)
            .pipe(map((hotelData: any[]) => {
            this.processHotelDataResponse(hotelData);
            }),
            catchError((error: Error) => {
                this.handleHotelDataError(error);
                return hotelList;
            }));
        }

    private processHotelDataResponse(hotelData: IHotelData[]) {
    this.currentHotelData.hotelData = hotelData;
    this.currentHotelData.error = null;
    //this.currentTradingDataSource.next(this.currentTradingData); //Todo: check what it does
    }

    private handleHotelDataError(error: Error) {
    this.currentHotelData.hotelData = null;
    this.currentHotelData.error = error;
    //this.currentTradingDataSource.next(this.currentTradingData); //Todo: check what it does
    }
}
