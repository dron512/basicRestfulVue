<template>
  <div class="h-full p-4">
    <h1 class="text-5xl">FREEBOARD/IUPUT</h1>
    <div>
      <div class="m-1">
        <div class="my-3 flex">
          <label for="title" class="mt-3">제목</label>
          <input type="text" name="" id="title" v-model="title"
            class="border border-gray-200 ring-1 focus:outline-none p-2 ml-2 flex-1 rounded">
        </div>
        <div>
          <label for="title"></label>
          <textarea name="" id="" cols="30" rows="10" v-model="content"
            class="border border-gray-200 ring-1 focus:outline-none p-2 mr-2 w-full rounded"></textarea>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <button @click="save"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { insert } from '@/api/freeboard.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');
// const author = ref('');

const router = useRouter();

const save = async () => {
  const res = await insert(title.value,content.value);
  if(res.status.toString().startsWith("2")){
    router.push({name:'freeboard'});
  }
}
</script>

<style lang="scss" scoped></style>