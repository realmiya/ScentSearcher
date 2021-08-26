import processData from '../apis/processData';

const postReview = (review) =>
processData(`/perfumes/review`, 'post', null, null, review).then((response) => response);
export default postReview;
