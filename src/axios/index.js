import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8088/api';
axios.defaults.timeout = 5000;

axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
})

function get(url, params) {
   return new Promise((resolve,reject)=>{
       axios.get(url,{params}).then((res)=>{
           resolve(res)
       }).catch(err=>{
           reject(err)
       });
   })
}

export { get } 