import { Component, OnInit } from '@angular/core';
import { Currency,ChartData } from '../../model/index';
import {DateHelpers} from '../../helpers';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  public lineChartData: Array<ChartData> = [
     new ChartData([65, 59, 80, 81, 56, 55, 40],'EUR/HUF','EUR/HUF'),
     new ChartData([28, 48, 40, 19, 86, 27, 90],'USD/HUF','USD/HUF'),
     new ChartData([18, 48, 77, 9, 100, 27, 40],'GBP/HUF','GBP/HUF')
  ];
  public lineChartLabels: Array<string> = [
    DateHelpers.toLocaleDateString(new Date(2016,0,1)),
    DateHelpers.toLocaleDateString(new Date(2016,1,1)),
    DateHelpers.toLocaleDateString(new Date(2016,2,1)),
    DateHelpers.toLocaleDateString(new Date(2016,3,1)),
    DateHelpers.toLocaleDateString(new Date(2016,4,1)),
    DateHelpers.toLocaleDateString(new Date(2016,5,1)),
    DateHelpers.toLocaleDateString(new Date(2016,6,1))];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { fill:false,
      borderColor: 'rgba(168,139,177,1)',
      backgroundColor: 'rgba(168,139,177,1)',            
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { fill:false,
      borderColor: 'rgba(77,83,96,1)',
      backgroundColor: 'rgba(77,83,96,1)',      
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { 
      fill:false,  
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
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
