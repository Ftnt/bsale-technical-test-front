import './style.css'
import * as constants from "./utils/constants";
import {renderProduct,renderCategory} from './utils/components';

const PATH = "category";
const PATH_PRODUCT = "product";

const getCategory = async () => {
  const response = await fetch(`${constants.API_URL_DEV}${PATH}`)
  return response.json()
}

const getProductByCategory = async (id) => {
  const response = await fetch(`${constants.API_URL_DEV}${PATH}/${id}`)
  return response.json()
}

const getSearchProduct = async (name) => {
  const response = await fetch(`${constants.API_URL_DEV}${PATH_PRODUCT}/?name=${name}`)
  return response.json()
}

async function category(){
  const category = await getCategory()
  renderCategory(category)
}

async function products(idCategory) {
  const products = await getProductByCategory(idCategory)
  renderProduct(products)
}

function searchProduct(){
  const $search = document.querySelector('#search-navbar')
  const $button = document.querySelector('#btnSearch');
  const $nameCategory = document.querySelector('#nameCategory')

  $button.addEventListener('click',async () => {
    const product = await getSearchProduct($search.value.replace(/\s/g, '+'));
    $nameCategory.innerHTML = 'Resultado de la busqueda'
    renderProduct(product)
  })
}

searchProduct()
category()
products('1')

export {products}

