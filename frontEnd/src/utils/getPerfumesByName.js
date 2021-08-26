import processData from '../apis/processData';
import getParameterList from './getParameterList';

const getPerfumesByName = (perfumeName) => {
  const parametersList = getParameterList({
    name: "perfumename",
    value: perfumeName,
  });
  return processData(`/perfumes/search`, 'get', null, parametersList, null).then((response) => response);
}

export default getPerfumesByName;
