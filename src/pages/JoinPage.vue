<template>
  <div class="bg-gray-100 flex items-center justify-center h-full">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Join</h2>
      <form action="#" method="POST">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input required v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1"
            id="email" type="email" placeholder="Enter your email" />
          <span class="text-red-500">{{ emailAlert }}</span>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input required v-model="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-1"
            id="name" type="text" placeholder="Enter your Name" />
          <span class="text-red-500">{{ nameAlert }}</span>
        </div>
        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            @click.prevent="login">
            Join
          </button>
        </div>
      </form>
      <div class="mt-3 flex flex-col space-y-5 opacity-0 transition-opacity duration-300" :class="{ isJoin: isJoin }">
        <h1>회원가입이 완료되었습니다.</h1>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          @click="moveLogin">
          loginPage
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reqJoin } from "@/api/login.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref("");
const email = ref("");
const emailAlert = ref("");
const nameAlert = ref("");

const isJoin = ref(false);

const moveLogin = () => {
  router.push({ name: "login" });
}

const login = async () => {
  if (email.value == '') {
    emailAlert.value = "이메일을 입력하세요";
    return;
  }
  else if (name.value == '') {
    nameAlert.value = "이름을 입력하세요";
    return;
  }

  let res = await reqJoin(email.value, name.value);
  if (res.status === 201) {
    email.value = "";
    name.value = "";
    isJoin.value = true;
  }

};
</script>

<style scoped>
.isJoin {
  opacity: 1;
}
</style>
