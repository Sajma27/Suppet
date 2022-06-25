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
  fieldName: string;
  label: string;
  fieldType: formFieldType;
  disabled: boolean;
  disabledOnNew: boolean;
  disabledOnEdit: boolean;

  constructor(fieldName: string, label: string, fieldType: formFieldType = 'text', disabled: boolean = false,
              disabledOnNew: boolean = false, disabledOnEdit: boolean = false) {
    this.fieldName = fieldName;
    this.label = label;
    this.fieldType = fieldType;
    this.disabled = disabled;
    this.disabledOnNew = disabledOnNew;
    this.disabledOnEdit = disabledOnEdit;
  }
}
