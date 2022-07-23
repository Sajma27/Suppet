import { ClassDto } from "../../dashboard-classes/model/class-dto";

export class AgentDto {
  name: string = null;
  classes: ClassDto[] = [];
  environment: string = null;
}
