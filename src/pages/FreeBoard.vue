<template>
  <div class="h-full p-4">
    <h1 class="text-5xl">FREEBOARD</h1>
    <div>
      <div class="w-full flex justify-end">
        <RouterLink to="freeboard/input" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">글쓰기</RouterLink>
      </div>
      <div class="m-1">
        <table class="w-full border border-blue-300 border-collapse cursor-pointer">
          <thead>
            <tr class="bg-slate-200">
              <th class="p-2">id</th>
              <th class="p-2">title</th>
              <th class="p-2">name</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, index) in items" :key="index"
              class="border border-blue-300 border-collapse hover:bg-slate-100">
              <td class="p-2">{{ item.id }}</td>
              <td class="p-2">{{ item.title }}</td>
              <td class="p-2">{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [{ "id": "1", "title": "title", "name": "홍길동" }, { "id": "1", "title": "title", "name": "홍길동" }, { "id": "1", "title": "title", "name": "홍길동" }];
</script>

<style lang="scss" scoped></style>