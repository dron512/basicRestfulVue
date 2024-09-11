const URL = import.meta.env.VITE_API_URL || 'default_url';
import axios from 'axios'

export const reqLogin = async (email, name) => {
  const params = {
    email,
    name
  }
  let res;
  try {
    res = await axios.get(`${URL}/login`, { params })
    console.log(res);
  } catch (e) {
    console.log(e);
    return e;
  }
  return res
}

export const reqJoin = async (email, name) => {
  const params = {
    email,
    name
  }
  let res = ''
  try {
    res = await axios.post(`${URL}/user/insert`, params)
  } catch (e) {
    return e;
  }
  return res;
}

export const reqValidate = async () => {
  const tokenStr = localStorage.getItem('mhToken')
  if (!tokenStr) return 'notLogin'
  else {
    let res = ''
    try {
      res = await axios.get(`${URL}/jwtvalidate`, {
        headers: { Authorization: `Bearer ${tokenStr}` }
      })
    } catch (e) {
      if (e.response.data.errorCode == 'VALIDITY_PERIOD_EXPIRED') {
        localStorage.removeItem('mhToken')
      }
      return e
    }
    return res
  }
}
