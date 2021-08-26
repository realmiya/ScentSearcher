import processData from '../apis/processData';

const getAccountId = (username, bearerToken) =>{
  let header = {
    "Authorization" : `Bearer ${bearerToken}`
  };
  return processData(`/register/${username}`, 'get', header, null, null).then((response) => {
    console.log(response);
    return response;
  });
}

export default getAccountId;
