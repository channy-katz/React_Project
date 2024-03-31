import axios from "axios"
let baseUrl="http://localhost:4000/api/product"

  export const getproducteById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}
export const getProductsByCategory = (category,page,perPage,search) => {
  
  return axios.get(`${baseUrl}/category/${category}/?page=${page}&perPage=${perPage}&txt=${search}`)
  alert("הצליח")
}


export const getAllProduct = (page, perPage, serach) => {
  return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&txt=${serach}`);
};
export const deleteproduct = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: { "x-access-token": token } });
};
export const addProduct = (product,token) => {
  return axios.post(baseUrl,{ category:product.category,prodName:product.prodName,price:product.price,imgUrl:product.imgUrl,description:product.description },
  { headers: {
      "x-access-token": token,
    },
  })
}
