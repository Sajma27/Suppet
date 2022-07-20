import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ActiveEnvironmentManager {

  get activeEnvironment(): string {
    return this._activeEnvironment;
  }

  set activeEnvironment(value: string) {
    this._activeEnvironment = value;
  }

  private _activeEnvironment: string = null;

}
