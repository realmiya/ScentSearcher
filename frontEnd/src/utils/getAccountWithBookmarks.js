import processData from '../apis/processData';

const getAccountWithBookmarks = (username, bearerToken) =>{
  let header = {
    "Authorization" : `Bearer ${bearerToken}`
  };
  return processData(`/register/${username}/bookmark`, 'get', header, null, null).then((response) => {
    console.log(response);
    return response;
  });
}

export default getAccountWithBookmarks;
