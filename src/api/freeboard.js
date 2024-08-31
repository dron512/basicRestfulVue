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

export const findById = async (id) => {
  const mhToken = localStorage.getItem('mhToken');
  try {
    const res = await axios.get(`${url}/freeboards/${id}`, {
      headers: {
        'Authorization': `Bearer ${mhToken}`
      },
    });
    return res;
  } catch (e) {
    return 'error';
  }
}

export const insert = async (title,content) => {
  const mhToken = localStorage.getItem('mhToken');
  const data ={
    title,
    content,
    "author": "string"
  }
  const config = {
    headers: {
      'Authorization': `Bearer ${mhToken}`
    }
  }
  try {
    const res = await axios.post(`${url}/freeboards`, data, config );
    return res;
  } catch (e) {
    return 'error';
  }
}

export const update = async (id,title,content) => {
  const mhToken = localStorage.getItem('mhToken');
  const data ={
    id,
    title,
    content,
    "author": "string"
  }
  const config = {
    headers: {
      'Authorization': `Bearer ${mhToken}`
    }
  }
  try {
    const res = await axios.put(`${url}/freeboards`, data, config );
    return res;
  } catch (e) {
    return 'error';
  }
}

export const deleteId = async (id) => {
  const mhToken = localStorage.getItem('mhToken');
  const config = {
    headers: {
      'Authorization': `Bearer ${mhToken}`
    }
  }
  try {
    const res = await axios.delete(`${url}/freeboards/${id}`, config );
    return res;
  } catch (e) {
    return 'error';
  }
}