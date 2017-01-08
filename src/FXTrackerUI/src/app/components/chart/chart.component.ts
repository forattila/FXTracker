import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from "rxjs/Rx";
import { Currency, FxRate } from '../../model/index';
import { ChartData, ChartConfig,ChartColor } from './model/index';
import { DateHelpers } from '../../helpers';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private subscriptions: Array<Subscription>;

  @Input() config: ChartConfig;

  private fxRates: Array<FxRate>;

  private selectedCurrencies: Array<Currency>;

  public lineChartData: Array<ChartData>;

  public lineChartLabels: Array<string>;
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColors: Array<ChartColor> = new Array<ChartColor>();
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor() { }

  ngOnInit() {
    this.initSubscriptions();
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

    if (this.config && this.config.fxRates$) {
      this.subscriptions.push(
        Observable.combineLatest(
          this.config.fxRates$,
          this.config.selectedCurrencies$
        ).subscribe(elements => {
          let [fxRates,selectedCurrencies] = elements;
          this.fxRates = fxRates;
          this.porcessFXRates(fxRates,selectedCurrencies);
        })
      );
    }
  }

  private porcessFXRates(fxRates: Array<FxRate>,selectedCurrencies: Array<Currency>) {
    if (fxRates) {      
      let filteredRates = fxRates.filter(r=>{
        return selectedCurrencies.find(c=>c.id===r.id);
      });
      this.lineChartData =  new Array<ChartData>();
      this.lineChartLabels = new Array<string>();
      let sortedRates = filteredRates
        .sort((r1, r2) => {
          return (r1.date < r2.date) ? -1 : 1;
        });
      sortedRates.forEach(r => {
        let dateString = DateHelpers.toLocaleDateString(r.date);
        if (!this.lineChartLabels.find(l => l === dateString)) {
          this.lineChartLabels.push(dateString);
        }
        if (!this.lineChartData.find(data => data.id === r.id)) {
          //TODO:Label       
          this.lineChartData.push(new ChartData([], r.id, r.id));
        }
      });      

      this.lineChartLabels.forEach(label => {
        this.lineChartData.forEach(chartData=>{
          let currentRate = sortedRates.find(r=>r.id===chartData.id && DateHelpers.toLocaleDateString(r.date)===label);
          chartData.data.push(currentRate?currentRate.rate:0);
        });
      });

      while(this.lineChartColors.length<this.lineChartData.length){
        this.lineChartColors.push(this.generateLineColor());
      }
    }
  }

  private generateLineColor(): ChartColor {
    let color1 = 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',1)';
    let color2 = 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.8)';
    let newColor =  new ChartColor( {
      fill: false,
      borderColor: color1,
      backgroundColor: color1,
      pointBackgroundColor: color2,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: color2
    });

    return newColor;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
