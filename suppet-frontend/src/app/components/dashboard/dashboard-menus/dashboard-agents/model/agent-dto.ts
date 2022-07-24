import { ClassDto } from "../../dashboard-classes/model/class-dto";
import { AgentsConfig } from "./agents-config";

export class AgentDto {
  name: string = null;
  classes: ClassDto[] = [];
  environment: string = null;
  config: AgentsConfig = null;
}
