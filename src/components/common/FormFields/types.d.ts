interface Common {
  field: FieldProps;
  form: FormProps;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  specificStyle?: CSSProperties;
}

export interface ITextInputProps extends Common {
  type?: string;
  iconClick?: () => void;
  autoComplete?: string;
  handleOnBlur?: (e: any) => void;
  handleOnChange?: (e: any) => void;
}
