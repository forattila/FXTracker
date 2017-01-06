import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../interfaces/index';
import { Currency, FxRate } from '../model/index';
import { CurrencyActions } from '../reducers/index';

@Injectable()
export class FxRateService {

  constructor(private store: Store<IAppStore>) {

  }

  public getCurrencies() {
    let currencies = new Array<Currency>();
    currencies.push(new Currency('EUR/HUF', 'EUR/HUF'));
    currencies.push(new Currency('GBP/HUF', 'GBP/HUF'));
    currencies.push(new Currency('USD/HUF', 'USD/HUF'));
    this.store.dispatch({ type: CurrencyActions.SET_CURRENCIES, payload: currencies });
  }

  public getFxRates() {
    let fxRates = new Array<FxRate>();
    for (let i = 0; i < 7; i++) {
      let eurhufRate = 305 + Math.floor(Math.random() * 10);
      let gbphufRate = 360 + Math.floor(Math.random() * 10);
      let usdhufRate = 290 + Math.floor(Math.random() * 10);
      fxRates.push(new FxRate('EUR/HUF', new Date(2016, i, 1), eurhufRate));
      fxRates.push(new FxRate('GBP/HUF', new Date(2016, i, 1), gbphufRate));
      fxRates.push(new FxRate('USD/HUF', new Date(2016, i, 1), usdhufRate));
    }
    this.store.dispatch({ type: CurrencyActions.SET_FXRATES, payload: fxRates })
  }

}
