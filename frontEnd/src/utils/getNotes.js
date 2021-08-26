import processData from '../apis/processData';
import getParameterList from "./getParameterList";

const getNotes = (noteName) => {
  const parametersList = getParameterList({
    name: "notename",
    value: noteName,
  });
  return processData(`/notes/search`, 'get', null, parametersList, null).then((response) => response);
}

export default getNotes;
