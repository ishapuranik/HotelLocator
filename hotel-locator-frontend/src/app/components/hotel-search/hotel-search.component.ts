import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { debounce, take } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss'],
})
export class HotelSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  //hotelSearchField: any = '';
  hotelsList: any = [];
  form!: FormGroup;
  search$: Subject<string> = new Subject<string>();

  private _unsub = new Subject<any>();

  constructor(private hotelService: HotelService, private fb: FormBuilder) {
    this.form = this.fb.group({
      hotelSearchField: new FormControl(''),
      rating: new FormControl(0)
    })
  }

  ngOnInit() {
    this.getHotelsList();

    this.search$
      .asObservable()
      .pipe(debounce(() => interval(3000)))
      .subscribe((value?: string, rating?: number) => {

        var hotelSearchText = this.form.get("hotelSearchField")?.value;
        var ratingValue = this.form.get("rating")?.value;

        this.hotelService
          .getHotelFilterDataObservable(hotelSearchText, ratingValue)
          .pipe(take(1))
          .subscribe((a: any) => {
            this.hotelsList = [...a.hotelSearchListDto];
          });
      });
  }

  ngAfterViewInit(): void {

    this.form.valueChanges.subscribe((res) => {
      
       const { rating } = res;
       this.search$.next(rating);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsub.next('');
    this._unsub.complete();
  }


  public getHotelsList() {
    this.hotelService
      .getHotelDataObservable()
      .pipe(take(1))
      .subscribe(
        (a: any) => {
          this.hotelsList = [...a.hotelListModel];
        },
        () => {
          this.hotelsList = [];
        }
      );
  }

  handleByHotelName(event: any) {
    this.search$.next(event);
  }
}
