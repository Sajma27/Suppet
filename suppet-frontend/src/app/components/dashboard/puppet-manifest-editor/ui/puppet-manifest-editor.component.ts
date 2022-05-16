import { Component, OnInit } from '@angular/core';
import {PuppetManifestEditorService} from "../core/service/puppet-manifest-editor.service";
import {PuppetManifest} from "../core/model/puppet-manifest";
import {PuppetDbNodesService} from "../../../../commons/puppet-db/nodes/puppet-db-nodes.service";
import {PuppetDbEventsService} from "../../../../commons/puppet-db/events/puppet-db-events.service";

@Component({
  selector: 'app-puppet-manifest-editor',
  templateUrl: './puppet-manifest-editor.component.html',
  styleUrls: ['./puppet-manifest-editor.component.scss']
})
export class PuppetManifestEditorComponent implements OnInit {

  canSave: boolean = false;
  lastSaveResult: boolean | null = null;

  manifest: PuppetManifest = new PuppetManifest();
  nodes: string = '';
  catalogs: string = '';

  constructor(private puppetManifestService: PuppetManifestEditorService,
              private puppetDbNodesService: PuppetDbNodesService,
              private puppetDbCatalogsService: PuppetDbEventsService) { }

  ngOnInit(): void {
    this.manifest.content = "Loading...";
    this.puppetManifestService.getCurrentManifestFile().subscribe((manifest: PuppetManifest) => {
      this.manifest.content = manifest?.content || 'Cannot load current manifest';
      this.canSave = manifest !== null;
    }, () => { this.manifest.content = "Cannot load current manifest" });
  }

  onSetManifest(): void {
    this.puppetManifestService.setNewManifestFile(this.manifest).subscribe(result => this.lastSaveResult = result);
  }

  updateAgent(): void {
    this.puppetManifestService.updateAgent().subscribe(() => alert('Pykło'));
  }

  getNodes(): void {
    this.puppetDbNodesService.fetchData().subscribe((response: any) => this.nodes = JSON.stringify(response));
  }

  getCatalogs(): void {
    this.puppetDbCatalogsService.fetchData().subscribe((response: any) => this.catalogs = JSON.stringify(response));
  }
}
