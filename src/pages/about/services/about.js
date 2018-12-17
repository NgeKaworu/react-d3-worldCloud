import request from '../../../utils/request';


export const fetch = ({ author }) => {
  return request(`/api/author/getAbout?author=${author}`);
}
