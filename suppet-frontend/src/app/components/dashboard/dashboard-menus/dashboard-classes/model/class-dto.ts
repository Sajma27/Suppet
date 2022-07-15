import { BasePuppetFile } from "../../../../../commons/models/base-puppet-file";

export class ClassDto extends BasePuppetFile {
  params: string[] = [];
  paramsValues: Map<string, string> = new Map<string, string>();

  constructor(name: string, content: string = null, environment: string = null) {
    super(content, name, environment);
  }
}
