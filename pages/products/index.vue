<template>
  <div class="flex items-center">
    <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
    >
      <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
      </svg>
    </button>

  </div>

  <div>
    <div class="flex justify-between">
      <div class="mb-5 flex gap-4 items-center">
        <h3 class="text-3xl font-medium text-gray-700">
          Products
        </h3>
        <ModelComponent open-btn-name="Add New"
                        modal-title="Add New Product"
                        action-btn-name="Add"
                        @model-action="addProduct"
        >
          <form @submit.prevent="addProduct">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="title">Title</label>
                <input
                    v-model="ProductItem.title"
                    class="w-full p-1 border mt-2 border border-primary border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="text"
                >
              </div>

              <div>
                <label class="text-gray-700" for="category">category</label>
                <input
                    v-model="ProductItem.category"
                    class="w-full p-1 border mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="text"
                >
              </div>

              <div>
                <label class="text-gray-700" for="Price">Price</label>
                <input
                    v-model="ProductItem.price"
                    class="w-full p-1 border mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="number"
                    step="0.5"
                >
              </div>

              <div>
                <label class="text-gray-700" for="description">description</label>
                <input
                    v-model="ProductItem.description"
                    class="w-full p-1 border mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="text"
                >
              </div>
              <div>
                <label class="text-gray-700" for="image">image</label>
                <input
                    v-model="ProductItem.image"
                    class="w-full p-1 border mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="text"
                >
              </div>
            </div>
          </form>
        </ModelComponent>
      </div>
      <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </span>

        <input
            class="w-32 pl-10 p-3 pr-4 border text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            type="text"
            placeholder="Search by Full name / ID / Price"
            v-model="filterValue"
        />
        <button
            class="open-btn ml-4 px-6 py-3 mt-3 font-medium tracking-wide text-white bg-lime-600 rounded-md hover:bg-lime-500 focus:outline-none"
            @click="search">Search </button>
        <button
            class="open-btn ml-4 px-6 py-3 mt-3 font-medium tracking-wide text-white bg-rose-600 rounded-md hover:bg-rose-500	 focus:outline-none"
            @click="clear">Clear filters</button>

      </div>
    </div>


    <div class="mt-8">
      <div class="flex flex-col mt-6">
        <div
            class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div
              class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table class="min-w-full">
              <thead>
              <tr>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                >
                  Name / ID
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                >
                  Rating
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                >
                  categories
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                >
                  Price
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                >Action</th>
              </tr>
              </thead>

              <tbody class="bg-white">
                <ProductCard v-for="(p, index) in  filterProduct ? filterProduct : products" :key="index" :product="p" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useProducts from "../../composables/useProducts";


const productApi= useProducts();

const open = ref(false)

const {data: products }  = await productApi.getAll()
const filterValue = ref()
const filterProduct = ref()
async function search() {

  filterProduct.value = products.value.filter(item =>
      item.title === filterValue.value ||
      item.id.toString() === filterValue.value ||
      item.price.toString() === filterValue.value
  )
}

async function clear() {
  filterProduct.value = null
  filterValue.value = ''
}

interface ProductData {
  title: string,
          price:number,
          description: string,
          image: string,
          category: string
}

const ProductItem = ref<ProductData>({
  category: "",
  description: "",
  image: "",
  price: "" ,
  title: ""

})
async function addProduct() {
  await productApi.create(ProductItem) ;
  console.log(ProductItem);
  ProductItem.value=""
  console.log("Product Added but no action in fake API store")
 }

</script>

<style scoped>

</style>