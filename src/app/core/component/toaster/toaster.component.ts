import { Component, Input, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ToasterSService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  modal_info_title = '';
  modal_error_title = ''
  constructor(
    toasterService: ToasterService,
    private toasterSService: ToasterSService
    ) {
    this.toasterService = toasterService;
   }
  @Input() isLoading = false;
  ngOnInit(): void {
    this.toasterSService.currentStatus.subscribe(
      dt => console.log(dt)
    )
  }
  showSuccess(mess) {
    this.toasterService.pop('success', this.modal_info_title, mess);
  }
  showError(mess) {
    this.toasterService.pop('error', this.modal_error_title, mess);
  }
}
