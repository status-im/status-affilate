import React from 'react';
import { Formik, Field, Form } from 'formik';
import { postResponse } from '../utils/api';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const isFilledOut = (values) => {
  if(!values.firstName.length || !values.lastName.length || !values.email.length === 0 
    || !values.agreed.length || values.email !== values.emailConfirm) {
    return false;
  } else {
    return true;
  }
}

const FormTemplate = () => {
  const history = useHistory();
  const validate = (values) => {
    const errors = {};
    if (values.firstName !== '' && !values.firstName) {
      errors.firstName = 'Required';
    }
  
    if (values.lastName !== '' && !values.lastName) {
      errors.lastName = 'Required';
    }
  
    if (values.email !== '' && !values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (values.emailConfirm !== '' && values.email !== values.emailConfirm) {
      errors.emailConfirm = 'Please confirm your email address';
    }

    return errors;
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div className="relative bg-gray-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden" data-aos="zoom-y-out">

            {/* Background illustration */}
            <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" aria-hidden="true">
              <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="35.542%" cy="34.553%" fx="35.542%" fy="34.553%" r="96.031%" id="ni-a">
                    <stop stopColor="#DFDFDF" offset="0%" />
                    <stop stopColor="#4C4C4C" offset="44.317%" />
                    <stop stopColor="#333" offset="100%" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center" style={{ justifyContent: 'center' }}>

              {/* CTA content */}
              <div className="lg:text-left lg:max-w-xl">
                <h4 className="h3 text-center text-white mb-10">YOUR INFORMATION</h4>

                {/* CTA form */}
                <div className="w-full lg:w-auto">

                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:mx-0">

                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      email: '',
                      emailConfirm: '',
                      agreed: [],
                    }}
                    onSubmit={async (values) => {
                      if (values.agreed[0] === 'checked') {
                        values.agreed = true;
                      } else {
                        alert('Please check')
                      }
                      const response = await postResponse(values);
                      if (response) {
                        console.log(response)
                        history.push('/thankyou')
                      } else {
                        alert('Something went wrong with the API')
                      }
                    }}
                    validate={validate}
                  >
                    {({ errors, touched, values }) => (
                      <Form>
                        {/* <label htmlFor="firstName">First Name</label> */}
                        <Field 
                          id="firstName" 
                          name="firstName" 
                          placeholder="First Name" 
                          className="w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 sm:mr-2 text-white placeholder-gray-500"
                        />
                        {errors.firstName && <div style={{ color: 'white' }}>{errors.firstName}</div>}

                        {/* <label htmlFor="lastName">Last Name</label> */}
                        <Field 
                          id="lastName" 
                          name="lastName" 
                          placeholder="Last Name" 
                          className="w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mt-6 sm:mr-2 text-white placeholder-gray-500"
                        />
                        {errors.lastName && <div style={{ color: 'white' }}>{errors.lastName}</div>}

                        {/* <label htmlFor="email">Email Address</label> */}
                        <Field
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          type="email"
                          className="w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mt-6 sm:mr-2 text-white placeholder-gray-500"
                        />
                        {errors.email && touched.email && <div style={{ color: 'white' }}>{errors.email}</div>}

                        {/* <label htmlFor="emailConfirm">Confirm Email Address</label> */}
                        <Field
                          id="emailConfirm"
                          name="emailConfirm"
                          placeholder="Confirm Email Address"
                          type="email"
                          className="w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mt-6 sm:mr-2 text-white placeholder-gray-500"
                        />
                        {errors.emailConfirm && <div style={{ color: 'white' }}>{errors.emailConfirm}</div>}
                      
                        <Field 
                          type="checkbox" 
                          name="agreed"
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" 
                          value="checked"
                        />
                          <p className="mt-6 mb-2 accept-tnc">Accept Terms & Conditions</p>

                        <Link className="see-tnc cta-hover" to="/status-terms">See Terms & Conditions</Link>
                        
                        <p className="text-sm text-gray-400 mt-6">
                          By clicking Accept Terms & Conditions you agree to {' '}
                          <Link className="a-links cta-hover" to="/status-terms">Status' Terms of Service</Link>, 
                          the <Link className="a-links cta-hover" to="/affiliate-terms">Affiliate Program Terms of Service</Link>, 
                          and the <a className="a-links cta-hover" href="https://status.im/privacy-policy/">Privacy Policy</a>.
                        </p>
                        {isFilledOut(values) ? (
                          <button type="submit" className="btn text-white bg-blue-600 hover:bg-blue-700 shadow mt-12">Submit</button>
                        ) : (
                          <button type="submit" disabled className="btn text-white bg-gray-600 not-allowed shadow mt-12">Submit</button>
                        )}      
                      </Form>
                    )}
                  </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormTemplate;
