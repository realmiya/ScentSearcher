const validate = (name, data) => {
  const { value } = data[name];

  switch (name) {
    // case 'email': {
    //   if (!value) {
    //     return 'Please input your email';
    //   }

    //   const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    //   if (!EMAIL_REGEXP.test(value)) {
    //     return 'Please input a valid email';
    //   }

    //   return '';
    // }

    case 'password': {
      if (!value) {
        return 'Please input your password';
      }

      if (value.toString().length < 6) {
        return 'Password must be at least 6 characters';
      }

      return '';
    }

    case 'confirmPassword': {
      // console.log(value);
      // console.log(data.password);
      if (!value) {
        return 'Please input your confirm password';
      }

      if (value !== data.password.value) {
        return 'Confirm password does not match password';
      }

      return '';
    }

    default:
      return '';
  }
};

export default validate;
