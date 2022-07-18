import { ClassParamType } from "./enum/class-param-type";

export class ClassParamDto {
  name: string = null;
  value: string = null;
  type: ClassParamType = ClassParamType.ANY;
}
