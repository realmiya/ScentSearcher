import processData from '../apis/processData';
import getParameterList from './getParameterList';

const getPerfumesById = (perfumeId) => {
  return processData(`/perfumes/${perfumeId}`, 'get', null, null, null).then((response) => response);
}

export default getPerfumesById;
