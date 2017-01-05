import { Component, Optional, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { Currency,ChartData } from './model/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isDarkTheme: boolean = false;

  private selectedCurrency: string;

  private currencies: Array<Currency>;



  /**
   * Main component
   */
  constructor() {
    this.currencies = new Array<Currency>();
    this.currencies.push(new Currency('EUR/HUF', 'EUR/HUF'));
    this.currencies.push(new Currency('GBP/HUF', 'GBP/HUF'));
    this.currencies.push(new Currency('USD/HUF', 'USD/HUF'));
  }

  public ngOnInit() {

  }



}

