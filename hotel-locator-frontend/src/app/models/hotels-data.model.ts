export interface IHotelData {
    name: string,
    description: Date,
    location: Date,
    rating: number
}

export class HotelDataResponse {
    hotelData : IHotelData[] | null;
    error : Error | null;

    constructor(hotelData: IHotelData[] | null, error: Error | null)
    {
        this.hotelData = hotelData;
        this.error = error;
    }
}