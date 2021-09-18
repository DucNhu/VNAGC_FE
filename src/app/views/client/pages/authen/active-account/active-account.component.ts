import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';

@Component({
  selector: 'app-active-account',
  template: `<app-load [isLoading]="loading"></app-load>
<toaster-container [toasterconfig]="toasterconfig"></toaster-container>`
})
export class ActiveAccountComponent implements OnInit {
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  loading = false;
  modal_info_title = 'Success';
  modal_error_title = 'Error'
  constructor(
    private authenservice: AuthenService,
    private activatedRoute: ActivatedRoute,
    toasterService: ToasterService,
    private router: Router
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get("id")
    this.authenservice.activeAcc(userId).subscribe(
      dt => {
        this.loading = false;
        this.router.navigate(["/"])
      },
      err => {
        this.showError("Something went wrong, please try again later")
        this.loading = false;
      }
    )
  }
  showSuccess(mess) {
    this.toasterService.pop('success', this.modal_info_title, mess);
  }
  showError(mess) {
    this.toasterService.pop('error', this.modal_error_title, mess);
  }
}
