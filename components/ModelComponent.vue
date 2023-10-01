<template>
  <div>
    <button
        class="open-btn px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        @click="openModelAction"
    >
      {{ openBtnName}}
    </button>

    <div
        :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
          } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
          class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
          @click="open = false"
      />

      <div
          class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <div
            class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
              class="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
          >
            <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>


        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              {{ modalTitle }}
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                  class="text-black fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
              >
                <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!-- Body -->
         <slot />

          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
                class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                @click="open = false"
            >
              Close
            </button>
            <button
                class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
                @click="modelActionSubmit"
            >
              {{ actionBtnName }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const open = ref(false)

const props = withDefaults(
    defineProps<{
      openBtnName?: string;
      modalTitle: string;
      actionBtnName?: string;

    }>(),
    {
      openBtnName: 'Open',
      actionBtnName: 'Save'
    }
);

const emit = defineEmits<{
  (e: "modelAction"): void;
  (e: "modelData"): void;

}>();

function modelActionSubmit() {
  emit("modelAction")
  open.value = false
}
function openModelAction() {
  emit("modelData")
  open.value = true
}


</script>

<style scoped>

</style>