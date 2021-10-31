import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseDashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  load = true;
  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',

      data: {
        datasets: [{
          label: '',   
          backgroundColor: "transparent",
          borderColor: "rgba(152, 235, 246,1)",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2500, y: 2.5 },
            { x: 3000, y: 5 },
            { x: 3400, y: 4.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 6 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: ''
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
            },
            scaleLabel: {
              labelString: '',
              display: false,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
            },
            scaleLabel: {
              labelString: '',
              display: false
            }
          }]
        }
      }
    });
  }
  
  // Bar
  chartOptions = {
    responsive: true,
  };
  chartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  chartLegend = true;
  chartPlugins = [];

  chartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // pie
  chartOptionsPie = {
    responsive: true,
  };
  chartLabelsPie = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  chartDataPie = [300, 500, 100];
  chartColorsPie = [{
    backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)'],
    borderColor: ['rgb(250,120,100)', 'green', '#0086c3']
  }];
  chartLegendPie = true;
  chartPluginsPie = [];

  constructor(
    private dashBoardService: DashBoardService
  ) { }

  Statistics = {
    "countProduct": 0,
    "countBlog": 0,
    "countBlogActive": 0,
    "coutAccout": 0,
    "orders": 0
  };
  ngOnInit(): void {
    this.dashBoardService.getStatistics().subscribe(
      dt => {
        this.Statistics = dt.Data;
        this.load = false;
        console.log(this.Statistics)
      }
    )
  }

}
