import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {routing} from './routes';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {FlexLayoutModule} from "@angular/flex-layout";
import {provideStore} from '@ngrx/store';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/index';

import {FxRateService,HttpService} from './services/index';

import {currencies,fxRates, selectedCurrencies} from './reducers/index';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    routing,
    ChartsModule
  ],
  providers: [
        Location,    
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    FxRateService,
    HttpService,
    provideStore({
      currencies,
      selectedCurrencies,
      fxRates
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
