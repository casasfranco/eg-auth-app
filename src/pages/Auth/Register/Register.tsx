import React from 'react';
// import styles from './Register.module.css';
import { Button, EButtonType, TextInput } from '../../../components/common';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { RegisterCredentials } from '../../../types';
import { authService } from '../../../lib/services/auth/authService';

const Register: React.FC = () => {
  const initialValues: {
    email: string;
    password: string;
    name: string;
  } = {
    email: '',
    password: '',
    name: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('This field must be an email').required('This field is required'),
    name: Yup.string().required('This field is required'),
    password: Yup.string()
      .min(8, 'Must be more than 8 digits')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        'Must contain at least 1 letter, 1 number, 1 special character, and have a minimum length of 8 characters'
      )
      .required('This field is required'),
  });

  const handleRegister = async (formValue: RegisterCredentials, { resetForm }: FormikHelpers<RegisterCredentials>) => {
    const { register } = authService;
    const response = await register(formValue);
    if (response.data?.name) {
      // Show message successfully registered
      resetForm();
    }
  };

  return (
    <div className="form-container sign-up-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
        <Form>
          <h1>Create Account</h1>
          <span className="my-5">or use your email for registration</span>

          <Field component={TextInput} required label="Name" name="name" placeholder="Enter your Name" />
          <Field component={TextInput} required label="Email" name="email" placeholder="Enter your email" />
          <Field component={TextInput} required label="Password" name="password" type="password" placeholder="Enter your password" />

          <div className="my-5">
            <Button buttonType={EButtonType.primary} block type="submit" className="text-uppercase btn-login">
              {'Sign Up'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
