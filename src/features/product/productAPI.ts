// A mock function to mimic making an async request for data
import axios from "axios";
import {IProduct} from "../../app/types";

export  async function fetchProductsFromApi() {
  try {
    const { data } = await axios.get('https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/');
    return data
  } catch (error) {
   console.log(error)
  }
}
export  async function createProduct(product:IProduct) {
  try {
    const { data } = await axios.post('https://62286b649fd6174ca82321f1.mockapi.io/case-study/products',product);
    return data
  } catch (error) {
    console.log(error)
  }
}

export  async function getCategories() {
  try {
    const { data } = await axios.get('https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/');
    return data
  } catch (error) {
    console.log(error)
  }
}