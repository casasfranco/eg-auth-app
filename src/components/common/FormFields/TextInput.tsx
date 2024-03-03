import React, { Fragment } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import { ITextInputProps } from './types';
import './TextInput.css';

const requiredFormatter = (label: string) => {
  return (
    <Fragment>
      {label} <span className="required-asterix">*</span>
    </Fragment>
  );
};

const TextInput = (props: ITextInputProps) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { touched, errors },
    required = true,
    className,
    label,
    type = 'text',
    placeholder,
    hint,
    autoComplete = 'off',
    disabled = false,
    handleOnBlur,
    handleOnChange,
  } = props;

  const classes = classNames(className, {
    'is-invalid': errors[name] && touched[name],
  });

  const handleInputChange = (event: any) => {
    onChange && onChange(event);
    handleOnChange && handleOnChange(event);
  };

  const handleInputBlur = (event: any) => {
    onBlur && onBlur(event);
    handleOnBlur && handleOnBlur(event);
  };

  return (
    <div>
      {label && <label htmlFor={name}>{required ? requiredFormatter(label) : label}</label>}
      <input
        id={`${name}-input`}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className={classes}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      {touched[name] && errors[name] && <ErrorMessage name={name} component="div" className="invalid-feedback" />}
      {hint && !(touched[name] && errors[name]) && <div>{hint}</div>}
    </div>
  );
};

export default TextInput;
