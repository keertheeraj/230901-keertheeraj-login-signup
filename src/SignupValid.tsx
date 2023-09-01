interface ErrorObject {
  Name : string;
  email: string;
  password: string;
  mobile : string;
}

function Validation(values: { Name:string;email: string; password: string; mobile: string }): ErrorObject {
  let error: ErrorObject = {
    Name:'',
    email: '',
    password: '',
    mobile : ''
  };

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  if (values.Name === '') {
      error.Name= 'Name Should not be empty';
    } else {
      error.Name = '';
    }

  if (values.email === ''){
    error.email = 'Email Should not be empty';
  } else if (!email_pattern.test(values.email)) {
    error.email = 'Email format is incorrect';
  } else {
      error.email = '';
  }

  if (values.password === '') {
    error.password = 'Password Should not be empty';
  }else {
      error.password = '';
  }

  if(values.mobile === ''){
    error.mobile = 'mobile number Should not be empty';
  }

  return error;
}

export default Validation;