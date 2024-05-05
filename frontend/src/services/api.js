import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const axiosPictureInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
})

/**
 * @param {object} credentials { identifier, password }
 * @return { object } { jwt, user }
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

/**
 * @param {object} userData User data object containing fields like email, username, password, etc.
 * @return {object} Registration response containing JWT token and user data
 */
const registerApi = async (userData) => {
  const response = await axiosInstance.post('/auth/local/register', userData)
  return response?.data
}

const updateArtisan = async (artisan, id, headers) => {
  const response = await axiosInstance.put(`/artisans/${id}`, artisan, headers)
  return response?.data
}

const updateProduit = async (produit, id, headers) => {
  const response = await axiosInstance.put(`/produits/${id}`, produit, headers)
  return response?.data
}

const createProduit = async (produit, headers) => {
  const response = await axiosInstance.post('/produits', produit, headers)
  return response?.data
}

export { loginApi, registerApi, updateArtisan, updateProduit, createProduit }
