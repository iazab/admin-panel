<template>
  <div class="mt-4">
    <h3 class="text-3xl font-medium text-gray-700">
      Categories
    </h3>
    <div class="mt-4">
      <div
          class="w-full max-w-sm overflow-hidden bg-white border rounded-md shadow-md"
          v-for="cat in categories"
      >
          <div
              class="flex items-center justify-between px-5 py-3 text-gray-700 border-b"
          >
            <h3 class="text-sm" >
              {{ cat }}
            </h3>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {data: categories }  = await useFetch('https://fakestoreapi.com/products/categories')
</script>

<style scoped>

</style>