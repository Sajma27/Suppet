export type formFieldType = 'textarea' | 'date' |
  'datetime-local' |
  'email' |
  'month' |
  'number' |
  'password' |
  'search' |
  'tel' |
  'text' |
  'time' |
  'url' |
  'week';

export class UniversalBrowserFormField {
  readonly fieldName: string;
  readonly label: string;
  readonly fieldType: formFieldType;
  readonly required: boolean;
  disabled: boolean;
  readonly disabledOnNew: boolean;
  readonly disabledOnEdit: boolean;

  constructor(fieldName: string, label: string, fieldType: formFieldType = 'text', required: boolean = false, disabled: boolean = false,
              disabledOnNew: boolean = false, disabledOnEdit: boolean = false) {
    this.fieldName = fieldName;
    this.label = label;
    this.fieldType = fieldType;
    this.required = required;
    this.disabled = disabled;
    this.disabledOnNew = disabledOnNew;
    this.disabledOnEdit = disabledOnEdit;
  }
}
