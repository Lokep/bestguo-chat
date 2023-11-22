<style lang="scss" scoped>
.birthday {
}
</style>

<template>
  <div class="birthday w-2/3 h-full py-4 fixed left-0 right-0 top-0 m-auto">
    <div class="w-full h-full shadow rounded-lg overflow-hidden relative">
      <Firework class="w-full h-full" />

      <div class="absolute left-0 top-0 w-full h-full z-10">
        <Letter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Firework from "@/features/firework.vue";
import Letter from "@/features/letter.vue";
</script>
