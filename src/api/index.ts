export const URL = 'https://jsonplaceholder.typicode.com'
import axios from 'axios'

export const Axios = axios.create({
  timeout: 30000
})
