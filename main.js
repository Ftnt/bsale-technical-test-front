import './style.css'
import * as constants from "./utils/constants";
import {renderProduct,renderCategory} from './utils/components';

const PATH = "category";
const PATH_PRODUCT = "product";
const $notFount = document.querySelector('#notFound');

const getCategory = async () => {
  const response = await fetch(`${constants.API_URL}${PATH}`)
  return response.json()
}

const getProductByCategory = async (id) => {
  const response = await fetch(`${constants.API_URL}${PATH}/${id}`)
  return response.json()
}

const getSearchProduct = async (name) => {
  const response = await fetch(`${constants.API_URL}${PATH_PRODUCT}/?name=${name}`)
  return response.json()
}

async function category(){
  $notFount.classList.add('hidden')
  const category = await getCategory()
  renderCategory(category)
}

async function products(idCategory) {
  $notFount.classList.add('hidden')
  const products = await getProductByCategory(idCategory)
  renderProduct(products)
}

function searchProduct(){
  const $search = document.querySelector('#search-navbar')
  const $button = document.querySelector('#btnSearch');
  const $nameCategory = document.querySelector('#nameCategory')
  

  $button.addEventListener('click',async () => {
    $notFount.classList.add('hidden')
    const product = await getSearchProduct($search.value.replace(/\s/g, '+'));
    $nameCategory.innerHTML = 'Resultado:'
    if(product.code === 404){
      $notFount.classList.remove('hidden')
    }
    console.log(product.code);
    renderProduct(product)
  })
}

searchProduct()
category()
products('1')

export {products}

