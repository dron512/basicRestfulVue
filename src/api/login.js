const url = "http://localhost:8080";
import axios from "axios";

export const reqLogin = async (email,name)=>{
  const params = {
    email,
    name,
  };
  const res = await axios.get(`${url}/login`,{params});
  return res;
}

export const reqJoin = async (email,name)=>{
  const params = {
    email,
    name,
  };
  const res = await axios.get(`${url}/user/insert`,{params});
  return res;
}

export const reqValidate = async()=>{
  const tokenStr = localStorage.getItem('mhToken');
  if(!tokenStr) return "notLogin";
  else{
    const res = await axios.get(`${url}/jwtvalidate`,{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
    return res;
  }
}
