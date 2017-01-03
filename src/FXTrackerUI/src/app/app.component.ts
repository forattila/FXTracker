import * as d3 from 'd3';
import * as Rickshaw from 'rickshaw';
import { Component, Optional, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { Currency } from './model/index';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isDarkTheme: boolean = false;

  @ViewChild('graph', { read: ViewContainerRef }) private graphRef: ViewContainerRef;
  @ViewChild('legend', { read: ViewContainerRef }) private legendRef: ViewContainerRef;

  private selectedCurrency: string;

  private currencies: Array<Currency>;

  graph: any;
  hoverDetail: any;
  legend: any;
  shelving: any;
  axes: any;

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

    let seriesData = [[], [], []];
    let random = new Rickshaw.Fixtures.RandomData(150);
    for (var i = 0; i < 150; i++) {
      random.addData(seriesData);
    }

    this.graph = new Rickshaw.Graph({
      element: this.graphRef.element.nativeElement,
	    width: 800,
	    height: 500,      
      renderer: 'line',
      series: [
        {
          color: 'steelblue',
          data: [{ x: 0, y: 23 }, { x: 1, y: 15 }, { x: 2, y: 79 }],
          name: 'USD/HUF',
        }, {
          color: 'lightblue',
          data: [{ x: 0, y: 30 }, { x: 1, y: 20 }, { x: 2, y: 64 }],
          name: 'EUR/HUF',
        }
      ]
    });
    this.graph.render();


    this.hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: this.graph
    });
    this.legend = new Rickshaw.Graph.Legend({
      graph: this.graph,
      element: this.legendRef.element.nativeElement
    });
    this.shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
      graph: this.graph,
      legend: this.legend
    });
    this.axes = new Rickshaw.Graph.Axis.Time({
      graph: this.graph
    });

    this.axes.render();

  }


}

