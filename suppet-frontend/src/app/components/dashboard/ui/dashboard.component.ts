import { Component, OnInit } from '@angular/core';
import { AuthService, User } from "@auth0/auth0-angular";
import { DashboardToggledButtons } from "../model/dashboard-toggled-buttons";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User = null;
  readonly logoSrc: string = '/assets/logo-white-small.png';

  readonly toggledButton: DashboardToggledButtons = new DashboardToggledButtons();
  private readonly defaultAvatar: string = '/assets/default-avatar.png';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const userObservable = this.auth.user$.subscribe(
      (profile) => {
        this.user = profile;
        userObservable.unsubscribe();
      },
    );
  }

  getUserImg(): string {
    return this.user?.picture || this.defaultAvatar;
  }
}
