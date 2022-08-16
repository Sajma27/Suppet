import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ActiveEnvironmentManager {
  private readonly ENVIRONMENT_COOKIE = 'environment';

  get activeEnvironment(): string {
    return this._activeEnvironment;
  }

  set activeEnvironment(value: string) {
    this._activeEnvironment = value;
    this.cookies.set(this.ENVIRONMENT_COOKIE, value);
    this.activeEnvironmentSubject.next(value);
  }

  private _activeEnvironment: string = null;

  private activeEnvironmentSubject: Subject<string> = new Subject<string>();

  constructor(private cookies: CookieService) {
    const cookieEnvironment: string = this.cookies.get(this.ENVIRONMENT_COOKIE);
    if (cookieEnvironment?.length > 0) {
      this._activeEnvironment = cookieEnvironment;
    }
  }

  getActiveEnvironmentObservable(): Observable<string> {
    return this.activeEnvironmentSubject.asObservable();
  }

  hasActiveEnvironment(): boolean {
    return !_.isNil(this._activeEnvironment);
  }
}
