<script setup>
import { reqValidate } from "@/api/login.js";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const isLoading = ref(true);
const data = ref(null);
const login = ref(false);

const route = useRoute();
const router = useRouter();
// const mhToken = localStorage.getItem('mhToken');
watch(
  () => route.path,
  async (newPath) => {
    console.log(newPath);
    // route이 변경될 때마다 호출됩니다.
    try {
      const res = await reqValidate();
      if (res.status === 200) {
        login.value = "login success";
        data.value = res.data;
      } else {
        login.value = undefined;
      }
      isLoading.value = false;
    } catch (e) {
      login.value = undefined;
      isLoading.value = false;
    }
    // 원하는 로직을 여기에 추가합니다.
  }
);
onMounted(async () => {
  try {
    const res = await reqValidate();
    if (res.status === 200) {
      console.log("login success");
      login.value = "login success";
      data.value = res.data;
    }
    isLoading.value = false;
  } catch (e) {
    isLoading.value = false;
  }
});
const reqLogout = () => {
  router.push({ name: "logoutPage" });
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <!-- 비동기 로딩이 완료된 후 렌더링될 콘텐츠 -->
    <div class="flex flex-col h-screen">
      <div class="flex bg-slate-500 p-3 text-white">
        <div class="flex flex-1 space-x-4">
          <RouterLink to="/"><h1>HOME</h1></RouterLink>
          <RouterLink to="/freeboard"><h1>FREEBOARD</h1></RouterLink>
        </div>
        <div v-if="login" class="group relative">
          <span class="cursor-pointer" @click="router.push({name:'home'})">{{ data.name }}님</span>
          <div class="absolute hidden group-hover:block w-24 top-6 -left-6">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              @click="reqLogout"
            >
              로그아웃
            </button>
          </div>
        </div>
        <div v-else>
          <RouterLink to="/login"><h1>LOGIN</h1></RouterLink>
        </div>
      </div>
      <RouterView />
      {{ data }}
    </div>
  </div>
</template>

<style scoped></style>
