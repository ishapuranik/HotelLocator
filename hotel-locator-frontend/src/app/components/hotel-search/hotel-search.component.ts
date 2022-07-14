import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import  { toPromise } 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {
  hotelSearchField: any = "";
  hotelsList: any = [];
  
  constructor(private hotelService: HotelService) { }

  ngOnInit()
  {
    this.getPendingTrades();
}

public getPendingTrades() {
    this.hotelService.getHotelDataObservable().subscribe().(a => {
    this.hotelsList = a;
  }).catch();
}

  handleByHotelName() {
    if (this.hotelSearchField.length > 3) {

      // //Call here Service, which will call Web api and display result
      // fetch(`http://localhost:5000/city-and-airport-search/${this.hotelSearchField}`)
      // .then(response => response.json())
      // .then(data => this.hotelSearchField = data.data)
    }
  }
}
