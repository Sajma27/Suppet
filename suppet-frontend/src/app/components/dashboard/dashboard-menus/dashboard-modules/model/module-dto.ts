import { BasePuppetFile } from "../../../../../commons/models/base-puppet-file";

export class ModuleDto extends BasePuppetFile {
  version: string;

  constructor(content: string, name: string, version: string, environment: string) {
    super(content, name, environment);
    this.version = version;
  }
}
