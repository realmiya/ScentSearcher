import axios from 'axios';
import { BACKEND_URL } from '../env';
//Copyright (c) 2020 Jason Watmore
const processData = (url, method, header, parameterList, body) => {
  const Header = { ...header };
  Header['Content-Type'] = 'application/json';
  Header.accept = 'application/json';
  const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: false,
    headers: { ...Header },
  });
  let param = '';
  if (parameterList !== null && parameterList !== undefined) {
    param += '?';
    parameterList.forEach((element) => {
      param += element.name + '=' + element.value + '&';
    });
    param = param.substring(0, param.lastIndexOf('&'));
  }
  const processing = (processingUrl) => {
    switch (method) {
      case 'get':
        return instance.get(processingUrl, body);
      case 'post':
        return instance.post(processingUrl, body);
      case 'put':
        return instance.put(processingUrl, body);
      case 'delete':
        return instance.delete(processingUrl, body);
      default:
        return null;
    }
  };
  if (processing !== null) {
    return processing(url + param)
      .then((response) => response.data)
      .catch((err) => err);
  }
};

export default processData;
