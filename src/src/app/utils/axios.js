import axios from 'axios';

const schoolid = window.SCHOOL = 'WISEDU';
const instance = axios.create({
  // baseURL: 'http://axsh-demo.wisedu.com/'
  baseURL: '/'
});

// 网络请求之前的预处理
instance.interceptors.request.use(config => {
  // if (config.method == 'post') {
  //   config.data.schoolid = schoolid;
  // } else {
  //   config.params.schoolid = schoolid;
  // }
  // // config.onDownloadProgress = function(e) {
  //   // console.log(`total: ${e.total}, loaded: ${e.loaded}`);
  // // }
  return config;
}, error => {
  Promise.reject(error);
});


// 网络请求之后的处理
instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response);
})

axios.defaults = instance;

export default instance;