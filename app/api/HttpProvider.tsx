import axios from 'axios';

type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';
export default class HttpProvider {
  constructor() { }

  request = async (method: MethodType, url: string, params?: {}) => {
    const methodName = method.toUpperCase();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    let route = url;

    switch (methodName) {
      case 'GET':
        return axios.get(route, config);
      case 'PUT':
        return axios.put(route, params, config);
      case 'POST':
        return axios.post(route, params, config);
      case 'PATCH':
        return axios.patch(route, params, config);
    }
  };
}
