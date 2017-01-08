export class ChartColor {
      public fill: boolean;
      public borderColor: string;
      public backgroundColor: string;
      public pointBackgroundColor: string;
      public pointBorderColor: string;
      public pointHoverBackgroundColor: string;
      public pointHoverBorderColor: string;

      /**
       * Chart color
       */
      constructor(chartColor: ChartColor) {
          this.fill = chartColor.fill;
          this.borderColor = chartColor.borderColor;
          this.backgroundColor = chartColor.backgroundColor;
          this.pointBackgroundColor= chartColor.pointBackgroundColor,
          this.pointBorderColor = chartColor.pointBorderColor;
          this.pointHoverBackgroundColor = chartColor.pointHoverBorderColor;
          this.pointHoverBorderColor = chartColor.pointHoverBorderColor;
      }
}