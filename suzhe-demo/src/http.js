import axios from "axios";

const profile = process.env.VUE_APP_INFO;
const http = axios.create({
  baseURL: profile,
  timeOut: 10000,
  validateStatus(status) {
    const bool = status >= 200 && status < 300;
    return bool;
  }
});

export const {
  _get: get,
  _post: post,
  _patch: patch,
  _put: put,
} = http;

export default {
  install(Vue) {
    Vue.prototype.$http = http;
  }
};
