import { Component, OnInit } from '@angular/core';
import { AuthService, User } from "@auth0/auth0-angular";
import { take } from "rxjs/operators";
import { DashboardMenus } from "../dashboard-menus/model/dashboard-menus";
import _ from "lodash";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User = null;
  readonly logoSrc: string = '/assets/logo-white-small.png';
  readonly menuTypes = DashboardMenus;

  private userImg: string = '/assets/default-avatar.png';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe(
      (profile) => {
        this.user = profile;
        if (!_.isNil(profile?.picture)) {
          this.userImg = profile.picture;
        }
      },
    );
  }

  getUserImg(): string {
    return this.userImg;
  }
}
