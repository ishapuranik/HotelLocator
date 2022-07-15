import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { debounce, take } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {
  hotelSearchField: any = "";
  hotelsList: any = [];
  search$: Subject<string> = new Subject<string>();
  
  constructor(private hotelService: HotelService) { }

  ngOnInit()
  {
    this.getPendingTrades();

this.search$.asObservable().pipe(debounce(() => interval(3000))).subscribe((value: string) => {
  console.log(value);
  this.hotelService.getHotelFilterDataObservable(this.hotelSearchField).subscribe(a => {
        this.hotelsList = a;
    
});
});
}

public getPendingTrades() {
    this.hotelService.getHotelDataObservable().pipe(take(1)).subscribe(a => {
   
    this.hotelsList = [...a];
  }, () => {
    this.hotelsList = [];
  });
}

  handleByHotelName(event: any) {
 this.search$.next(event);}

}
