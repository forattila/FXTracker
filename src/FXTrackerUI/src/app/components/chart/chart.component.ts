import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from "rxjs/Rx";
import { Currency, FxRate } from '../../model/index';
import { ChartData, ChartConfig } from './model/index';
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

  public lineChartData: Array<ChartData> = new Array<ChartData>();

  public lineChartLabels: Array<string> = new Array<string>();
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      fill: false,
      borderColor: 'rgba(168,139,177,1)',
      backgroundColor: 'rgba(168,139,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      fill: false,
      borderColor: 'rgba(77,83,96,1)',
      backgroundColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      fill: false,
      borderColor: 'rgba(148,59,77,1)',
      backgroundColor: 'rgba(148,59,77,1)',
      pointBackgroundColor: 'rgba(148,59,77,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
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
        this.config.fxRates$.subscribe(fxRates => {
          this.fxRates = fxRates;
          this.porcessFXRates(fxRates);
        })
      );
    }
  }

  private porcessFXRates(fxRates: Array<FxRate>) {
    if (fxRates) {
      let sortedRates = fxRates
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
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
