//require axios
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const callApi = (
  url,
  data = {},
  opts = {
    hostName: null,
    method: 'GET',
    headers: {},
  },
  param = {}
) =>
  new Promise((resolve, reject) => {
    // console.log('data :', data);
    const options = Object.assign(
      {
        hostName: null,
        method: 'GET',
        headers: {},
      },
      opts
    );
    axios.defaults.baseURL = options?.hostName;
    const reqConfig = {
      method: options.method,
      url,
      responseType: 'json',
    };
    if (options.method === 'POST' || options.method === 'PATCH') {
      reqConfig.data = data;
    }
    reqConfig.params = param;
    reqConfig.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // axios.interceptors.request.use(undefined, (res) => {
    //   console.log('response >>> ', res);
    // });
    console.log(reqConfig);

    // customizable responses
    axios(reqConfig)
      .then((res) => {
        if (!res)
          return { success: false, message: 'Call failed' };
        console.log('res :', res);
        if (res.status === 200 || res.status === 201) {
          resolve(res.data);
        }
        if (res.status === 401) {
          console.log('Unauthorized');
        }
        if (res.status === 403) {
          console.log('Forbidden');
        }
      })
      .catch((err) => {
        // console.error(err);
        reject(err);
      });
  });

export default callApi;
