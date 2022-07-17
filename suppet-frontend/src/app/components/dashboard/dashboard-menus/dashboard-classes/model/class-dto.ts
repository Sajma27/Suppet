import { BasePuppetFile } from "../../../../../commons/models/base-puppet-file";
import { ClassParamDto } from "./class-param-dto";

export class ClassDto extends BasePuppetFile {
  params: ClassParamDto[] = [];

  constructor(name: string, content: string = null, environment: string = null) {
    super(content, name, environment);
  }
}
