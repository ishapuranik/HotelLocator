import { Injectable, Injector } from "@angular/core";

import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { ConfigurationService } from "src/app/services/configuration.service";

@Injectable({
    providedIn: 'root'
})

export class HotelApiEndpoint {
    private readonly _baseUrl: string = this.configurations.baseUrl;

    private readonly _hotelListDataUrl: string =
        this._baseUrl + "/HotelLocator";

    private readonly _hotelSearchDataUrl: string =
    this._baseUrl + "/HotelLocator/get-hotel-list-by-search-param";

    constructor(
        private http: HttpClient,
        protected configurations: ConfigurationService,
        injector: Injector
    ) {
        
    }

    public getHotelDataEndpoint<T>(): Observable<T> {
        return this.http
            .get<T>(this._hotelListDataUrl, this.getRequestHeaders())
            .pipe(
                tap(
                    (_) => {},
                    (error) => {}
                )
            );
    }

    public getHotelSearchByNameOrRatingDataEndpoint(
        hotelName? : string,
        rating? : number,
     ): Observable<any> {
        const params = {
            hotelName: hotelName
        } as any;
        if (rating != undefined && rating != null) {
            params['rating'] = rating;
        }
        if (hotelName != undefined && hotelName != null) {
            params['hotelName'] = hotelName;
        }
        return this.http
            .get(
                this._hotelSearchDataUrl,
                {
                    headers: this.getRequestHeaders().headers,
                    params
                }
            )
            .pipe(
                tap(
                    (_) => {},
                    (error) => {}
                )
            );
    }

    protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `application/vnd.iman.v${1}+json, application/json, text/plain, */*`,
            'App-Version': ConfigurationService.appVersion,
            'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        return { headers: headers };
    }
}