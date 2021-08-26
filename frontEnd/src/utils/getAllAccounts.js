import processData from '../apis/processData';

const getAllAccounts = () =>
processData(`/register`, 'get', null, null, null).then((response) => response);
export default getAllAccounts;
