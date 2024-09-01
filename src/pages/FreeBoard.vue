<template>
  <div class="overlay" :class="{ isModal: isModal }"></div>
  <div class="modal p-3 w-1/3" :class="{ isModal: isModal }">
    <span class="p-2">제목</span>
    <input type="text" @blur="updateFreeBoard" v-model="title" name="" id=""
      class="border border-gray-200 ring-1 focus:outline-none p-2 ml-2 flex-1 rounded">
    <textarea name="" id="" cols="30" rows="10" v-model="content" @blur="updateFreeBoard" style="width: 95%;"
      class="border border-gray-200 ring-1 focus:outline-none p-2 m-2 rounded"></textarea>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
      @click="closeModal">닫기</button>
  </div>
  <div class="h-full p-4">
    <h1 class="text-5xl">FREEBOARD</h1>
    <div>
      <template v-if="message">
        <h1 class="m-5 text-center text-red-500 text-5xl">{{ message }}</h1>
      </template>
      <template v-else>
        <div class="w-full flex justify-end mb-5">
          <RouterLink to="freeboard/input"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">글쓰기
          </RouterLink>
        </div>
        <div class="m-1">
          <table class="table-auto w-full border border-blue-300 border-collapse cursor-pointer" :class="{isUp:isUp}">
            <thead>
              <tr class="bg-slate-200 flex w-full">
                <th class="p-2">id</th>
                <th class="p-2 flex-grow">title</th>
                <th class="p-2 w-1/4">name</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(item, index) in items" :key="index"
                class="flex w-full border border-blue-300 border-collapse hover:bg-slate-100" @click="view(item.id)">
                <td class="p-2 text-center">{{ item.id }}</td>
                <td class="p-2 flex-grow text-center truncate">{{ item.title }}</td>
                <td class="p-2 w-1/4 text-center">{{ item.author }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
    <div class="flex justify-center mt-7">
      <div class="flex flex-col items-center w-1/3 border border-blue-300 p-5 view" :class="{ isView }">
        <h1 class="text-center">{{ title }}</h1>
        <h1 class="text-right">작성자 {{ author }}</h1>
        <div class="mx-5 mt-3 mb-8">
          <div>{{ content }}</div>
        </div>
        <div class="flex justify-center space-x-5">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            @click="modalView">수정</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            @click="deleteById">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { findAll, findById, update, deleteId } from "@/api/freeboard.js";

const isModal = ref(false);
const isView = ref(false);
const message = ref("");
const items = ref([]);

const title = ref('');
const content = ref('');
const author = ref('');
const idx = ref();
const isUp = ref(false);

watch(items,()=>{
  isUp.value = true;
  setTimeout(()=>{
    isUp.value = false;
  },500)
},{ deep: true });

const view = async (id) => {
  idx.value = id;
  isView.value = true;
  const res = await findById(id);
  if (res.status.toString().startsWith('2')) {
    title.value = res.data.title;
    content.value = res.data.content;
    author.value = res.data.author;
  }
  else {
    // console.log('에러');
  }
}

const updateFreeBoard = async () => {
  const res = await update(idx.value, title.value, content.value);
  if (res.status.toString().startsWith("2")) {
    const index = items.value.filter(item => item.id === idx.value);
    if (index.length>0) {
      index[0].title = title.value;
      index[0].content = content.value;
      index[0].author = author.value;
    }
  }
}

const deleteById = async()=>{
  const res = await deleteId(idx.value);
  if (res.status.toString().startsWith("2")) {
    const index = items.value.findIndex(item => item.id === idx.value);

  if (index !== -1) {
    // 조건에 맞는 요소를 찾았을 때
    items.value.splice(index, 1); // index 위치의 요소를 1개 삭제
    isView.value =false;
  } else {
    // console.log('No item found with the given id.');
  }
  }
}

const modalView = () => {
  isModal.value = true;
}

const closeModal = async () => {
  isModal.value = false;
}

onMounted(async () => {
  const res = await findAll();
  if (res == 'error') {
    message.value = "로그인하셔야 됩니다.";
  }
  else if (res.status.toString().startsWith("2")) {
    items.value = res.data;
  }
});
</script>

<style scoped>
.view {
  display: none;
}

.overlay {
  position: fixed;
  /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 반투명한 어두운 배경 */
  z-index: 1000;
  /* 모달보다 낮게 설정 */
  display: none;
  /* 초기 상태에서는 보이지 않게 설정 */
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달을 화면 중앙에 위치 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  /* overlay보다 높게 설정 */
  display: none;
  /* 초기 상태에서는 보이지 않게 설정 */
}

.isModal {
  display: block;
}

.isView {
  display: block;
}

.isUp{
  background-color: lightgray;
}
</style>
