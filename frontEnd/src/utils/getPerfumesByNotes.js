import processData from '../apis/processData';
import getParameterList from './getParameterList';

const getPerfumesByNotes = (notesObject) => {
  return processData(`/perfumes/search`, 'post', null, null, notesObject).then((response) => response);
}

export default getPerfumesByNotes;
