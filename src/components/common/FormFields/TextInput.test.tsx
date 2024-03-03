import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';
import { Formik, Form } from 'formik';

describe('TextInput', () => {
  const setup = (props = {}) => {
    const utils = render(
      <Formik initialValues={{ testInput: '' }} onSubmit={jest.fn()}>
        <Form>
          <TextInput
            field={{ name: 'testInput', value: '', onChange: jest.fn(), onBlur: jest.fn() }}
            form={{ touched: { testInput: false }, errors: {} }}
            label="Test Input"
            {...props}
          />
        </Form>
      </Formik>
    );
    const input = screen.getByLabelText('Test Input') as HTMLInputElement;
    return { ...utils, input };
  };

  it('renders TextInput correctly', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it('updates value on change', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');
  });

  it('displays an error message when input is invalid', () => {
    const errorMessage = 'This field is required';
    setup({
      form: { touched: { testInput: true }, errors: { testInput: errorMessage } },
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
