import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';

@Component({
  selector: 'app-report-manager',
  templateUrl: './report-manager.component.html',
  styleUrls: ['./report-manager.component.css']
})
export class ReportManagerComponent implements OnInit {
  listReport;
  loading = true;
  constructor(
    private dashBoardService: DashBoardService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    this.dashBoardService.getAllReport(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      dt => {
        this.loading = false;
        this.listReport = dt.Data;
        this.listReport.forEach(
          e => {
            let img = this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.userProfile.avatar}`);
            e.userProfile.avatar = e.userProfile.avatar ? img : 'assets/images/avatars/default-avatar.jpg';
          })
      }
    )
  }

  removeReport(id, index) {
    if (confirm('delete report?')) {
      this.loading = true;
      this.dashBoardService.removeReport(id).subscribe(
        dt => {
          this.loading = false;
          this.listReport.splice(index, 1)
        }
      )
    }
  }
}
