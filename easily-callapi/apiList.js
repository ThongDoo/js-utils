import callApi from './callApi';

export const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'test-url'
    : 'prod-url';

const initApi = (url, method, reqData = {}) => {
  const hostName = BASE_URL;
  const headers = {};
  const token = window.localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const opt = { hostName, method, headers };
  return callApi(url, reqData, opt);
};

const callThisApi = (payload) => initApi('api-link', 'method', payload);

export default {
  category: {
    callThisApi,
  },
};

//import apiList first
//call example: const request = apiList.category.callThisApi(payload)
//console.log(request) or check XHR
//profits