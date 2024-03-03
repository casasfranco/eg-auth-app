import React from 'react';
import './Button.css';
import classNames from 'classnames';

export enum EButtonType {
  default = 'primary',
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  transparent = 'transparent',
  link = 'link',
  success = 'btn-success',
}
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  buttonType?: EButtonType;
  className?: string;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  btnText?: string;
}
const Button = ({ onClick, children, buttonType = EButtonType.default, className = '', block, type = 'button', loading = false, btnText = '', ...restProps }: IButtonProps) => (
  <button onClick={onClick} type={type} id={`${btnText}-botton`} className={classNames('button', buttonType, className, { block: block })} {...restProps}>
    {children}
  </button>
);
export default Button;
