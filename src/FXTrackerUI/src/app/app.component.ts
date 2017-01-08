import { Component, Optional, ViewChild, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs/Rx";
import { Currency } from './model/index';
import { IAppStore } from './interfaces/index';
import { CurrencyActions } from './reducers/index';
import { FxRateService } from './services/index';
import { ChartConfig } from './components/chart/model/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription>;

  private isDarkTheme: boolean = false;

  private selectedCurrency: string;

  private currencies: Array<Currency>;

  private selectedCurrencies: Array<Currency>;

  private chartConfig: ChartConfig;

  private get addDisabled(): boolean {
    return !this.selectedCurrency || !!this.selectedCurrencies.find(c => c.id === this.selectedCurrency);
  }

  private get removeDisabled(): boolean {
    return !this.selectedCurrency || !this.selectedCurrencies.find(c => c.id === this.selectedCurrency);
  }

  private get hasSelectedCurrency(): boolean{
    return !!this.selectedCurrencies && this.selectedCurrencies.length>0;
  }

  /**
   * Main component
   */
  constructor(private store: Store<IAppStore>, private fxRateService: FxRateService) {
    this.chartConfig = new ChartConfig(
      this.store.select(s => s.fxRates),
      this.store.select(s => s.selectedCurrencies)
    );
  }

  public ngOnInit() {
    this.initSubscriptions();
    this.fxRateService.getCurrencies();
    this.fxRateService.getFxRates();
  }

  public ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  private initSubscriptions() {
    if (!this.subscriptions) {
      this.subscriptions = new Array<Subscription>();
    }

    this.subscriptions.push(this.store.select(s => s.currencies).subscribe(currencies => {
      this.currencies = currencies;

    }));

    this.subscriptions.push(this.store.select(s => s.selectedCurrencies).subscribe(currencies => {
      this.selectedCurrencies = currencies;
    }));
  }

  private addSelectedCurrency() {
    let selectedCurrency = this.currencies.find(c => c.id === this.selectedCurrency);
    if (selectedCurrency) {
      this.store.dispatch({ type: CurrencyActions.ADD_SELECTED_CURRENCY, payload: selectedCurrency });
    }
  }

  private removeSelectedCurrency() {
    let selectedCurrency = this.currencies.find(c => c.id === this.selectedCurrency);
    if (selectedCurrency) {
      this.store.dispatch({ type: CurrencyActions.REMOVE_SELECTED_CURRENCY, payload: selectedCurrency });
    }
  }
}

