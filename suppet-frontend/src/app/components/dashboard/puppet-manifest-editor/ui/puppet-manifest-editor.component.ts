import { Component, OnInit } from '@angular/core';
import {PuppetManifestEditorService} from "../core/service/puppet-manifest-editor.service";
import {PuppetManifest} from "../core/model/puppet-manifest";

@Component({
  selector: 'app-puppet-manifest-editor',
  templateUrl: './puppet-manifest-editor.component.html',
  styleUrls: ['./puppet-manifest-editor.component.scss']
})
export class PuppetManifestEditorComponent implements OnInit {

  canSave: boolean = false;
  lastSaveResult: boolean | null = null;

  manifest: PuppetManifest = new PuppetManifest();

  constructor(private puppetManifestService: PuppetManifestEditorService) { }

  ngOnInit(): void {
    this.manifest.content = "Loading...";
    this.puppetManifestService.getCurrentManifestFile().subscribe((manifest: PuppetManifest) => {
      this.manifest = manifest;
      this.canSave = true;
    }, () => { this.manifest.content = "Cannot load current manifest" });
  }

  onSetManifest(): void {
    this.puppetManifestService.setNewManifestFile(this.manifest).subscribe(result => this.lastSaveResult = result);
  }

}
