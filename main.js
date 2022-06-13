import './style.css'
import * as constants from "./utils/constants";

const PATH = "category";

const getCategory = async () => {
  const response = await fetch(`${constants.API_URL}${PATH}`)
  return response.json()
}

const getProductByCategory = async (id) => {
  const response = await fetch(`${constants.API_URL}${PATH}/${id}`)
  return response.json()
}

function renderCategory(){
  getCategory().then(({data,status}) => {
    console.log(data);
    const $category = document.querySelector('#category')
    const $nameCategory = document.querySelector('#nameCategory')
    $nameCategory.innerHTML = data[0].name[0].toUpperCase() + data[0].name.substring(1)
    if(status != 'error'){
      data.forEach(({id,name,img}) => {
        let newName = name[0].toUpperCase() + name.substring(1);
        const btnCategory = document.createElement('button')
        btnCategory.classList.add("flex", "flex-col", "w-20","items-center","gap-3")

        const categoryElement = document.createElement('div')
        categoryElement.classList.add("h-24", "w-24", "rounded-full","bg-purple-0","bg-hero","flex","justify-center","items-center","hover:bg-purple-2","active:focus:transition-none","active:focus:bg-purple-0")
        
        const divCategoryImage = document.createElement('div')
        divCategoryImage.classList.add("max-w-lg", "block", "p-4","text-center")

        const imgCategoryImage = document.createElement('img')
        imgCategoryImage.classList.add("object-cover")
        imgCategoryImage.src = img

        const spanCategoryName = document.createElement('span')
        spanCategoryName.classList.add("text-gray-101", "text-md","text-center","leading-tight","h-full","w-full","flex","justify-center")
        spanCategoryName.textContent = newName
        btnCategory.addEventListener('click', () => {
          $nameCategory.innerHTML = newName
          renderProducts(id)
        })

        $category.append(btnCategory)
        btnCategory.append(categoryElement)
        btnCategory.append(spanCategoryName)
        categoryElement.append(divCategoryImage)
        divCategoryImage.append(imgCategoryImage)
        
      })
  }
})
}

function renderProducts(idCategory) {
  getProductByCategory(idCategory).then(({data,status}) => {
    const $countProduct = document.querySelector('#countProduct')
    const $productList = document.querySelector('#products')
    $productList.innerHTML = ''
    countProduct.innerHTML = ''
    if(status != 'error'){
      $countProduct.append(`(${data.length})`)
      data.forEach(product => {
        let porcentaje = product.price*product.discount/100
        const productElement = document.createElement('div')
        productElement.classList.add("col-span-1", "h-28", "bg-gray-4","rounded-md")
        productElement.innerHTML = `
        <div class="relative w-full h-full p-1 flex justify-center rounded-lg shadow-md">
        <div class="w-44 h-full flex items-center justify-center mr-3 overflow-hidden rounded-lg">
        ${product.discount ?
          `<div class="absolute top-4 -left-2">
            <div class="bg-yellow-0 w-12 h-3 rounded-tr-sm rounded-br-sm">
              <span class="absolute text-pink-0 text-[8px] text-center w-full h-auto font-semibold px-1">Desc.
              <span>${product.discount}</span>%</span>
            </div>
          </div>`: ''}
          <img class="rounded-lg" src="${product.url_image ? product.url_image :'./images/No-image-available.svg'}" />
        </div>
        <div class="w-full h-full flex flex-col justify-center py-1">
          <p class="font-bold capitalize text-gray-0 text-sm sm:text-base">
            ${product.name}
          </p>
          ${product.discount?`<p class="text-xs line-through text-gray-1">Antes: $${product.price}</p>`:''}
          <p class="text-lg">$${product.discount? product.price-porcentaje:product.price}</p>
        </div>
        <div class="absolute bottom-0 right-0 m-1">
          <button type="button"
            class="p-1 flex items-center justify-center bg-yellow-0 text-purple-0  ease-out duration-300 rounded-full hover:bg-purple-0 hover:text-pink-0">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="22"
              width="22" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path
                d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>
        `
    $productList.append(productElement)
      })
    }
  })
}


renderCategory()
renderProducts('1')



