import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../interfaces/index';
import { Currency, FxRate } from '../model/index';
import { CurrencyActions } from '../reducers/index';
import { HttpService } from './http.service';
import { ApiUrls } from '../staticConfig';

@Injectable()
export class FxRateService {

  constructor(private store: Store<IAppStore>, private httpService: HttpService) {

  }

  public getCurrencies() {

    this.httpService.get(ApiUrls.CURRENCIES).subscribe((currencies: Array<Currency>) => {
      this.store.dispatch({ type: CurrencyActions.SET_CURRENCIES, payload: currencies });
    });
  }

  public getFxRates() {

    this.httpService.get(ApiUrls.FXRATES).subscribe((fxRates: Array<FxRate>) => {
      this.store.dispatch({ type: CurrencyActions.SET_FXRATES, payload: fxRates })
    });

  }

}
