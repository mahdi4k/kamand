import Vue from 'vue'
import axios from 'axios'


Vue.prototype.$axios = axios
// const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api/v1/' })
const api = axios.create({ baseURL: 'http://172.16.10.120:8000/api/v1/' })
Vue.prototype.$api = api
export { axios, api }
