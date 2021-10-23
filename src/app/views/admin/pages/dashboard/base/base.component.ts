import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseDashboardComponent implements OnInit {
  name = 'Angular   6';
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
