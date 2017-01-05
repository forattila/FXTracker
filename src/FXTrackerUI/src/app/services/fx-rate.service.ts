import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../interfaces/index';
import { Currency } from '../model/index';
import {CurrencyActions} from '../reducers/index';

@Injectable()
export class FxRateService {

  constructor(private store: Store<IAppStore>) {

  }

  public getCurrencies() {
    let currencies = new Array<Currency>();
    currencies.push(new Currency('EUR/HUF', 'EUR/HUF'));
    currencies.push(new Currency('GBP/HUF', 'GBP/HUF'));
    currencies.push(new Currency('USD/HUF', 'USD/HUF'));
    this.store.dispatch({type:CurrencyActions.SET_CURRENCIES,payload:currencies});
  }

}
