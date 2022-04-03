import { Injectable } from '@angular/core';
import {PuppetManifest} from "../model/puppet-manifest";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PuppetManifestEditorService {

  private apiUrl: string = environment.apiHostUrl + '/puppet/manifest';

  constructor(private http: HttpClient) {
  }

  getCurrentManifestFile(): Observable<PuppetManifest> {
    return this.http.get<PuppetManifest>(this.apiUrl + '/getCurrentManifestFile');
  }

  setNewManifestFile(manifest: PuppetManifest): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/setNewManifestFile', manifest);
  }

}
