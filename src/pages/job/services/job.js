import request from '../../../utils/request';


export const fetch = (value) => {
  return request(`/api/job/v1/${value}`);
}

export const fetchAllTime = () => request(`/api/feWordCloud/v1/date`);

export const fetchWordCloudWithTime = date => request(`/api/feWordCloud/v1/?createTime=${date}`);
