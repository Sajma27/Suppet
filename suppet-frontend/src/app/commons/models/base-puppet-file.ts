export class BasePuppetFile {
  content: string;
  name: string;
  environment: string;

  constructor(content: string, name: string, environment: string) {
    this.content = content;
    this.name = name;
    this.environment = environment;
  }
}
