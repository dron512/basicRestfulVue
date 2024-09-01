import { URL } from './util.js'
import axios from 'axios'

export const updateUser = async (id, email, name) => {
  const mhToken = localStorage.getItem('mhToken')
  const params = {
    id,
    email,
    name
  }
  const config = {
    headers: {
      Authorization: `Bearer ${mhToken}`
    }
  }
  const res = await axios.put(`${URL}/user/update`, params, config)
  return res
}
