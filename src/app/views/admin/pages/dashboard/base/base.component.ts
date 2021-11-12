import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseDashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  load = true;
  // @ViewChild('mychart') mychart;

  // ngAfterViewInit() {
  //   this.canvas = this.mychart.nativeElement;
  //   this.ctx = this.canvas.getContext('2d');

  //   let myChart = new Chart(this.ctx, {
  //     type: 'line',

  //     data: {
  //       datasets: [{
  //         label: '',
  //         backgroundColor: "transparent",
  //         borderColor: "rgba(152, 235, 246,1)",
  //         fill: true,
  //         data: [
  //           { x: 1, y: 2 },
  //           { x: 2500, y: 2.5 },
  //           { x: 3000, y: 5 },
  //           { x: 3400, y: 4.75 },
  //           { x: 3600, y: 4.75 },
  //           { x: 5200, y: 6 },
  //           { x: 6000, y: 9 },
  //           { x: 7100, y: 6 },
  //         ],
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       title: {
  //         display: false,
  //         text: ''
  //       },
  //       scales: {
  //         xAxes: [{
  //           type: 'linear',
  //           position: 'bottom',
  //           ticks: {
  //           },
  //           scaleLabel: {
  //             labelString: '',
  //             display: false,
  //           }
  //         }],
  //         yAxes: [{
  //           type: 'linear',
  //           ticks: {
  //           },
  //           scaleLabel: {
  //             labelString: '',
  //             display: false
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }

  // Bar
  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartLegend = true;

  chartData = [
    { data: [0,10,20], label: 'Count Orders' }
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


  Statistics = {
    "countProduct": 0,
    "countBlog": 0,
    "countBlogActive": 0,
    "coutAccout": 0,
    "coutOrder": 0,
    "countTotal": 0
  };

  listProductRating;
  listProductPopular;
  profile: user;
  listTopBlogView;
  datagetTopOrderByYear = [];

  constructor(
    private dashBoardService: DashBoardService,
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.getStatistics(),
      this.getProductTopRating(),
      this.getProductPopular(),
      this.getTopBlog(),
      this.getTopBlogByMonth(),
      this.getTopOrderByYear()
    ]).then(dt => {
      console.log(dt);
      this.profile = JSON.parse(sessionStorage.getItem("user") ? sessionStorage.getItem("user") : sessionStorage.getItem("user"));

      this.Statistics = dt[0].Data;
      this.listProductRating = dt[1].Data;
      this.listProductPopular = dt[2].Data;
      this.listTopBlogView = dt[3];
      let getTopOrderByYear = dt[5];
      for (let index = 0; index < 12; index++) {
        let x = index;
        ++x;
        this.chartLabels.push(x);
        let e = getTopOrderByYear[index];
        this.datagetTopOrderByYear.push(e[x]);
      }
      this.chartData[0].data = this.datagetTopOrderByYear;
  
      this.load = false;
    })
  }

  getProductTopRating(): Promise<any> {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getProductTopRating().toPromise();
      resolve(d)
    })
  }

  getStatistics(): Promise<any> {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getStatistics().toPromise();
      resolve(d)
    })
  }

  getProductPopular(): Promise<any> {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getProductPopular().toPromise();
      resolve(d)
    })
  }

  getTopBlog() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getTopBlog().toPromise();
      resolve(d)
    })
  }

  getTopBlogByMonth() {
    let start = 1;
    let end = 12;
    this.dashBoardService.getBlogByMonth(start, end).subscribe(
      dt => {
        console.log(dt)
      }
    )
  }

  getTopBlogByYear() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getBlogByYear().toPromise();
      resolve(d)
    })
  }
  getTopOrderByYear() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getOrderByYear().toPromise();
      resolve(d)
    })
  }
}
