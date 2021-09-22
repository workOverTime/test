import axios from '../config/service'

const root = '/api/v1'

export const login = (query) => axios.get(`/api/dashboard/index/overall`, { params: query })
export const ccc = (query) => axios.get(`${root}/api/dashboard/index/overall`, { params: query })
export const aaa = (query) => axios.post(`${root}/api/dashboard/index/post`, query)
