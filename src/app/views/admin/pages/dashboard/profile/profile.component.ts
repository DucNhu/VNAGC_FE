import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/core/_service/profile/profileService..service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: user; userId;
  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {
    this.userId = window.location.href.split("/")[window.location.href.split("/").length-1];
   }

  ngOnInit(): void {
    console.log(this.userId)
    this.profileService.getProfile(this.userId).subscribe(
      dt => {
        this.user = dt.Data[0];
        console.log(this.user)
      }
    )
  }

}
