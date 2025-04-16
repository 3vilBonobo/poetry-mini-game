<template>
  <div
    class="min-h-screen flex flex-col justify-between items-center text-center p-6"
  >
    <div class="poem-box max-w-xl mt-10">
      <p>{{ node.text }}</p>
    </div>

    <div class="flex flex-col items-center space-y-4 mt-10 w-full">
      <!-- Multiple options -->
      <template v-if="node.options">
        <button
          v-for="(option, index) in node.options"
          :key="index"
          @click="goTo(option.next)"
          class="btn-option bg-pink-200 hover:bg-pink-300 text-pink-900 font-medium py-3 px-6 rounded-2xl transition-all w-full sm:w-auto"
        >
          <span v-if="option.icon" class="mr-2">{{ option.icon }}</span
          >{{ option.text }}
        </button>
      </template>

      <!-- Single next -->
      <button
        v-else-if="node.next"
        @click="goTo(node.next)"
        class="btn-option bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold py-3 px-6 rounded-2xl transition-all"
      >
        👉 Επόμενο
      </button>

      <!-- End page -->
      <button
        v-else-if="node.end"
        @click="goHome"
        class="btn-option bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-6 rounded-2xl mt-6"
      >
        Αρχική Σελίδα
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import poemData from "../data/poems.json";

const route = useRoute();
const router = useRouter();

const node = computed(() => {
  return (
    poemData[route.params.id] || {
      text: "Δεν βρέθηκε η σελίδα.",
      end: true,
    }
  );
});

const goTo = (id) => {
  router.push(`/poem/${id}`);
};

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
button {
  font-family: "Courier New", monospace;
}
</style>
