import axios from 'axios';

const fetchMap = JSON.parse(process.env.VUE_APP_FETCH_MAP);
const http = axios.create({
  timeout: 3 * 60 * 1000, // 暂时修改超时时间，待后端优化
  validateStatus(status) {
    return status >= 200 && status < 300;
  }
});

const {
  get: _get, post: _post, delete: _delete, put: _put, patch: _patch,
} = http;

export { _get, _post, _put, _delete, _patch };
export default {
  install(Vue) {
    Vue.prototype.$http = http;
  }
};
