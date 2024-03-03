import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { EButtonType } from './Button';

describe('Button Component', () => {
  test('renders the Button component with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies the buttonType className', () => {
    render(<Button buttonType={EButtonType.secondary}>Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('secondary');
  });

  test('applies the block className when block is true', () => {
    render(<Button block>Block Button</Button>);
    expect(screen.getByText('Block Button')).toHaveClass('block');
  });

  test('is disabled when loading is true', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('renders with the specified button type', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset');
  });
});
