import React from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const navigate = useNavigate(); // Add useNavigate hook call

  const verifyForm = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: function (values) {
      axios
        .post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values) // Corrected the API URL
        .then(function (response) {
          navigate('/resetPassword'); // Navigate to home after successful verification
          console.log('true', response);
        })
        .catch(function (error) {
          console.log('false', error);
        });
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required('Reset code is required')
        .matches(/^\d{6}$/, 'Reset code must be 6 digits'), // Add regex for a 6-digit code
    }),
  });

  return (
    <div className='p-[150px]'>
      <h1 className='text-[32px]'>Reset your account password</h1>
      <form className="" onSubmit={verifyForm.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Reset Code:
          </label>
          <input
            type="text"
            id="resetCode"
            value={verifyForm.values.resetCode}
            onChange={verifyForm.handleChange}
            onBlur={verifyForm.handleBlur}
            name="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="000000"
            required
          />
        </div>
        {verifyForm.errors.resetCode && verifyForm.touched.resetCode ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{verifyForm.errors.resetCode}</span>
          </div>
        ) : null}

        <button
          type="submit"
          className="text-white bg-[#22db14] hover:bg-[#1FC712] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
