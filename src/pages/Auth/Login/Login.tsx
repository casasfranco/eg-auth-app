import React from 'react';

// import styles from './Login.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { Button, EButtonType, TextInput } from '../../../components/common';
import { authService } from '../../../lib/services/auth/authService';
import { LoginCredentials } from '../../../types';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('This field must be an email').required('This field is required'),
    password: Yup.string()
      .min(8, 'Must be more than 8 digits')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        'Must contain at least 1 letter, 1 number, 1 special character, and have a minimum length of 8 characters'
      )
      .required('This field is required'),
  });

  const handleLogin = async (formValue: LoginCredentials) => {
    const { login } = authService;
    const response = await login(formValue);
    if (response.data?.token) {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="form-container sign-in-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        <Form>
          <h1>Sign in</h1>
          <span className="my-5">or use your account</span>

          <Field component={TextInput} required label="Email" name="email" placeholder="Enter your email" />
          <Field component={TextInput} required label="Password" name="password" type="password" placeholder="Enter your password" />

          <a href="/forgot">Forgot your password?</a>
          <Button buttonType={EButtonType.primary} block type="submit" className="text-uppercase btn-login">
            {'Sign In'}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
