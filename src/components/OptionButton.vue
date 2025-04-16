<template>
  <button
    class="flex items-center gap-2 px-4 py-3 rounded-lg bg-fuchsia-100 hover:bg-fuchsia-200 transition"
  >
    <span class="text-2xl">{{ icon }}</span>
    <span class="text-lg">{{ text }}</span>
  </button>
</template>

<script setup>
defineProps(["icon", "text"]);
</script>
