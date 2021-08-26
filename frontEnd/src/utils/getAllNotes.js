import processData from '../apis/processData';
import getParameterList from "./getParameterList";

const getAllNotes = () => {
  return processData(`/notes`, 'get', null, null, null).then((response) => response);
}

export default getAllNotes;
