<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-center p-6"
  >
    <h1 class="text-3xl sm:text-4xl font-bold mb-6">
      Καλωσήρθες στο κουήρ ποίημα 💖
    </h1>
    <p class="text-lg sm:text-xl mb-8">
      Ένα ταξίδι με επιλογές, αγάπη, μπισκότα και κάρδαμο.
    </p>
    <button
      @click="start"
      class="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all"
    >
      Ξεκινάμε;
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const start = () => router.push("/poem/start");
</script>
