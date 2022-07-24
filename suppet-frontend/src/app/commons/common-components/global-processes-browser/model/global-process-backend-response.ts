export class GlobalProcessBackendResponse {
  result: number;
  errorMessage: string = null;


  constructor(result: number, errorMessage: string = null) {
    this.result = result;
    this.errorMessage = errorMessage;
  }
}
