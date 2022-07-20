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
  hotelSearchField: any = '';
  hotelsList: any = [];
  form!: FormGroup;
  search$: Subject<string> = new Subject<string>();

  private _unsub = new Subject<any>();

  constructor(private hotelService: HotelService, private fb: FormBuilder) {
    this.form = this.fb.group({
      rating: new FormControl(0)
    })
  }

  ngOnInit() {
    this.getPendingTrades();

    this.search$
      .asObservable()
      .pipe(debounce(() => interval(3000)))
      .subscribe((value: string) => {
        console.log(value);
        this.hotelService
          .getHotelFilterDataObservable(this.hotelSearchField)
          .subscribe((a) => {
            this.hotelsList = a;
          });
      });
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((res) => {
      const { rating } = res;
      console.log(rating);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsub.next('');
    this._unsub.complete();
  }


  public getPendingTrades() {
    this.hotelService
      .getHotelDataObservable()
      .pipe(take(1))
      .subscribe(
        (a) => {
          this.hotelsList = [...a];
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
