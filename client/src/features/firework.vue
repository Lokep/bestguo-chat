
<style lang="scss">
#canvas {
  background-image: url(@/assets/WeChatc305b8f032f07df4ebc0254836626b4c.jpg);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
}
</style>

<template>
  <canvas id="canvas" class="w-full h-full rounded"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {

  import('./firework').then(res => {
    res.default()
  })
})
</script>

