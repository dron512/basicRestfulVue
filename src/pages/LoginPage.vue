<template>
  <div class="bg-gray-100 flex items-center justify-center h-full">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>
      <form action="#" method="POST">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
            >Email</label
          >
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
            >Name</label
          >
          <input
            v-model="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-1"
            id="name"
            type="text"
            placeholder="Enter your Name"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            type="button"
            @keydown="login"
            @click="login"
          >
            Sign In
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <h1 class="p-3 text-red-500 text-2xl">{{ message }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reqLogin } from "@/api/login.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref("");
const email = ref("");
const message = ref('');

const login = async () => {
  const res = await reqLogin(email.value, name.value);
  if (res.status === 200) {
    localStorage.setItem("mhToken", res.data);
    router.push({ name: 'home' });
  }else if(res.response.data.errorCode=="INCORRECT_NAME_AND_EMAIL"){
    message.value='email과 name을 확인해주세요.';
  }
};
</script>

<style lang="scss" scoped></style>
