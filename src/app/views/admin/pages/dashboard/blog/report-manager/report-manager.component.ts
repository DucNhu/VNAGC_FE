import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';

@Component({
  selector: 'app-report-manager',
  templateUrl: './report-manager.component.html',
  styleUrls: ['./report-manager.component.css']
})
export class ReportManagerComponent implements OnInit {
  listReport;

  constructor(
    private dashBoardService: DashBoardService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.dashBoardService.getAllReport(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      dt => {
        this.listReport = dt.Data;
        console.log(this.listReport)
      }
    )
  }

}
