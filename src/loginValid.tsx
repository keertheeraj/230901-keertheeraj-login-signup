interface ErrorObject {
  email: string;
  password: string;
}

function Validation(values: { email: string; password: string }): ErrorObject {
  let error: ErrorObject = {
    email: '',
    password: '',
  };

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (values.email === '') {
    error.email = 'Email Should not be empty';
  } else if (!email_pattern.test(values.email)) {
    error.email = 'Email format is incorrect';
  } else {
      error.email = '';
  }
  if (values.password === '') {
    error.password = 'Password Should not be empty';
  }
  else {
      error.password = '';
  }
  return error;
}
export default Validation;