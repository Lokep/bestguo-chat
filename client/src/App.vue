<style lang="scss">
:root {
    --animate-duration: 300ms;
    // --animate-delay: 0.9s;
  }

#app {
  position: relative;
}
</style>

<template>
  <ToolBox />
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import ToolBox from "@/components/toolbox/index.vue";
</script>
