<style lang="scss" scoped>
.toolbox {
  &-item {
    @apply p-2;
    @apply bg-slate-50;
    @apply w-11;
    @apply h-11;
    @apply box-border;
    @apply rounded;
    @apply flex;
    @apply justify-center;
    @apply items-center;
    @apply cursor-pointer;
    @apply active:bg-slate-100;
    @apply text-slate-500;
    @apply active:text-black;
    @apply text-xl;

    .iconfont {
      &.is-active {
        animation: rotated 2s linear infinite;
      }
    }
  }
}

@keyframes rotated {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="toolbox fixed right-12 bottom-4 gap-2 flex flex-col">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="300"
    >
      <div class="toolbox-item" v-if="birthdayVisible" @click="togglePlay">
        <div
          class="iconfont iconyanchu text-xl"
          :class="{
            'is-active': isPlaying,
          }"
        ></div>
      </div>
    </transition>

    <div class="toolbox-item iconfont iconlihe" @click="showBirthDay"></div>

    <div class="iconfont iconshanchu toolbox-item" @click="clear"></div>

    <Loading v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useIndexedDBStore } from "@/stores/index";
import { useBirthDayStore } from "@/stores/birthday";

import Loading from '@/components/loading.vue'

const loading = ref(false)

const birthdayStore = useBirthDayStore();
const { visible: birthdayVisible } = storeToRefs(birthdayStore);

const store = useIndexedDBStore();
const { records } = storeToRefs(store);

const showBirthDay = () => birthdayStore.toggle();

const isPlaying = ref(false);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const clear = () => {
  loading.value = true;

  const timeOut = setTimeout(() => {
    records.value = []
    loading.value = false;
    clearTimeout(timeOut);
  }, 1000)
}
</script>
