import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'any-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AnyRatingComponent),
        multi: true,
    },
],
})
export class AnyRatingComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() initialValue: number = 0;

  @Input() defaultValue: number = 0;

  id = uuidv4();
  readonly: boolean = false;
  form!: FormGroup;

  private _unsub = new Subject<any>();

  get value(): any {
    return this.defaultValue;
  }

  set value(val) {
    this.defaultValue = val;

    this.propagateChange(val);
  }

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      rating: new FormControl(0)
    })
  }

  propagateChange = (_: any) => {};
  propagateTouch: any = () => {};
  validateFn: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  writeValue(val: any): void {
    if (val !== undefined) {
      this.value = val;
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.form.get('rating')?.patchValue(this.initialValue);
    this.cdr.detectChanges();
    console.log(this.disabled);
    this.form.valueChanges.pipe(takeUntil(this._unsub)).subscribe((value: any) => {
      const { rating } = value;
      this.writeValue(rating);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsub.next('');
    this._unsub.complete();
  }

  onChange(e: any): void {
    console.log(e);
  }
}
