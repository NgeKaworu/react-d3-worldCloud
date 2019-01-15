import request from "../../../utils/request";

export const fetch = ({ author }) => {
  return request(`/api/author/v1/about/${author}`);
};
