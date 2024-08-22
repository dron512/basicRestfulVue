<script setup></script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex space-x-4 bg-slate-500 p-3 text-white">
      <RouterLink to="/"><h1>HOME</h1></RouterLink>
      <RouterLink to="/freeboard"><h1>FREEBOARD</h1></RouterLink>
      <RouterLink to="/login"><h1>LOGIN</h1></RouterLink>
    </div>
    <RouterView/>
  </div>
</template>

<style scoped></style>
