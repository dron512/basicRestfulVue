<template>
  <div class="bg-gray-100 flex items-center justify-center h-full">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Logout</h2>
      <h3>로그아웃 하시겠습니까?</h3>
      <div class="mt-5 flex justify-center space-x-3">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
          @click="ok"
        >
          확인
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
          @click="cancel"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const ok = () => {
  localStorage.removeItem("mhToken");
  router.push({ name: "home" });
};
const cancel = () => {
  router.push({ name: "home" });
};
</script>

<style lang="scss" scoped></style>
