import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { HttpClientModule } from '@angular/common/http';
import { AnyRatingModule } from './components/rating/rating.module';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    HotelSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // internal
    AnyRatingModule,
    FlexLayoutModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
