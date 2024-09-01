<template>
  <div class="bg-gray-100 flex items-center justify-center h-full">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">MyPage</h2>
      <div class="mt-5 flex flex-col justify-center">
        <div>
          <label for="email">email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-1"
            type="text" name="email" id="" v-model="email"/>
        </div>
        <div>
          <label for="name">name</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-1"
            type="text" name="name" id="" v-model="name"/>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
          @click="ok">
          확인
        </button>
        <span class="text-2xl text-green-800">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reqLogin, reqValidate } from "@/api/login";
import { updateUser } from "@/api/user";
import router from "@/router";
import { ref, watchEffect } from "vue";

const message = ref('');
const email = ref('');
const name = ref('');
const id = ref('');

watchEffect(async () => {
  const res = await reqValidate();
  if (res.status.toString().startsWith('2')) {
    id.value = res.data.id;
    email.value = res.data.email;
    name.value = res.data.name;
  }
})

const ok = async() => {
  let res = await updateUser(id.value,email.value,name.value);
  if (res.status.toString().startsWith('2')) {
    res = await reqLogin(email.value,name.value);
    if (res.status.toString().startsWith('2')) {
      localStorage.setItem('mhToken',res.data);
      router.push({name:"home"})
    }
  }
};
</script>

<style lang="scss" scoped></style>
