<style lang="scss" scoped>
.letter {
  font-family: "Monospace" "Barlow", "PingFang SC";
}
.typed-cursor {
  color: #fff;
}
</style>

<template>
  <div id="letter" class="letter text-white p-4 text-base"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Typed from "typed.js";

import { storeToRefs } from "pinia";
import { useBirthDayStore } from "@/stores/birthday";

const birthdayStore = useBirthDayStore();

const { isTyped } = storeToRefs(birthdayStore);

onMounted(() => {
  new Typed("#letter", {
    strings: [
      "These are the default values...",
      "You know what you should do?",
      "Use your own!",
      "Have a great day!",
    ],
    typeSpeed: 100,
    startDelay: 1000,
    onComplete: () => {
      isTyped.value = true
    },
  });
});
</script>
