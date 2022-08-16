import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, User } from "@auth0/auth0-angular";
import { take } from "rxjs/operators";
import { DashboardMenus } from "../dashboard-menus/model/dashboard-menus";
import _ from "lodash";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import {
  ActiveEnvironmentManager
} from "../../../commons/active-environment-manager/active-environment-manager.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly STARTING_MENU_COOKIE: string = 'starting_menu';

  get isEnvironmentSelected(): boolean {
    return this._isEnvironmentSelected;
  }

  readonly noEnvironmentTooltip: string = 'Nie wybrano środowiska';

  user: User = null;
  readonly logoSrc: string = '/assets/logo-white-small.png';
  readonly menuTypes = DashboardMenus;

  private userImg: string = '/assets/default-avatar.png';
  private _isEnvironmentSelected: boolean = false;

  private environmentSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private environmentManager: ActiveEnvironmentManager,
              private cookies: CookieService) {
    this._isEnvironmentSelected = environmentManager.hasActiveEnvironment();
    this.subscribeToActiveEnvironment();
    this.navigateToStartingMenu();
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

  ngOnDestroy(): void {
    this.environmentSub?.unsubscribe();
  }

  getUserImg(): string {
    return this.userImg;
  }

  saveStartingMenu(menu: string): void {
    this.cookies.set(this.STARTING_MENU_COOKIE, menu);
  }

  private subscribeToActiveEnvironment(): void {
    this.environmentSub = this.environmentManager.getActiveEnvironmentObservable().subscribe(() => {
      this._isEnvironmentSelected = this.environmentManager.hasActiveEnvironment();
    })
  }

  private navigateToStartingMenu(): void {
    let startingMenu: string = DashboardMenus.ENVIRONMENTS;
    const cookieStartingMenu = this.cookies.get(this.STARTING_MENU_COOKIE);
    if (this.environmentManager.hasActiveEnvironment() && cookieStartingMenu?.length > 0) {
      startingMenu = cookieStartingMenu;
    }
    this.router.navigate([startingMenu]).then();
  }
}
