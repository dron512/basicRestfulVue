const url = "http://localhost:8080";
import axios from "axios";

export const findAll = async () => {
  const mhToken = localStorage.getItem('mhToken');
  try {
    const res = await axios.get(`${url}/freeboards`, {
      headers: {
        'Authorization': `Bearer ${mhToken}`
      },
    });
    return res;
  } catch (e) {
    return 'error';
  }
}

export const reqValidate = async () => {
  const tokenStr = localStorage.getItem('mhToken');
  if (!tokenStr) return "notLogin";
  else {
    const res = await axios.get(`${url}/jwtvalidate`, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    return res;
  }
}
