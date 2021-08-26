import processData from '../apis/processData';

const logIn = (body) =>
  processData('/login', 'post', {}, null, body).then((response) => response);
export default LogIn;
