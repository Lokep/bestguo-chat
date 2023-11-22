<style lang="scss">
.container {
  max-width: 100vw !important;

  .footer {
    background-color: #f7f9fb;

    &:focus-within {
      .iconfont {
        @apply text-black;
      }
    }

    .ipt {
      background-color: transparent;
    }

    .iconfont {
      font-size: 20px;
      line-height: 30px;
      padding: 7px 10px;
      text-align: center;
      transition: color 0.3s;
      box-sizing: content-box;
    }
  }
}
</style>

<template>
  <div class="container h-screen min-h-screen flex flex-col overflow-hidden">
    <div
      id="content"
      class="flex-1 w-2/3 mx-auto my-4 rounded p-4 text-base text-slate-600 overflow-scroll"
    >
      <Bubble v-for="(item, index) in records" :key="index" :id="item.id" :message="item.msg" :time="item.time"  />
    </div>

    <div class="footer my-4 flex w-2/3 mx-auto rounded shadow-sm">
      <input
        class="ipt p-3 text-center text-sm block flex-1 outline-none placeholder:text-slate-500 text-black"
        v-model="chat"
        type="text"
        placeholder="Enter message"
        @keyup.enter="sumit"
      />
      <div
        class="iconfont iconnavigation shrink-0 text-slate-500 box-border"
        @click="sumit"
      ></div>
    </div>

    <transition
      enter-active-class="animate__animated animate__fadeIn "
      leave-active-class="animate__animated animate__fadeOut "
    >
      <Birthday v-if="birthdayVisible" />
    </transition>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useIndexedDBStore } from "@/stores/index";
import { nextTick, onBeforeMount, onMounted, ref } from "vue";

import Birthday from "@/components/birthday/index.vue";

import { useBirthDayStore } from "@/stores/birthday";
import { storeToRefs } from "pinia";
import { showConfetti } from "@/features/confetti";
import Bubble from "@/components/bubble/index.vue";

let socket: any = null;
const chat = ref("");

const birthdayStore = useBirthDayStore();

const { visible: birthdayVisible } = storeToRefs(birthdayStore);

const DBName = "CHAT";

const store = useIndexedDBStore();
const { records } = storeToRefs(store);

const socketId = ref("");

const el = ref<HTMLElement[] | null>(null);

onBeforeMount(() => {
  getChatRecords();
});

onMounted(() => {
  generateSocket();
});

const generateSocket = () => {
  socket = io("http://192.168.16.108:3000");

  socket.on("connect", () => {
    socketId.value = socket.id;
  });

  socket.on("chat", ({ msg, id }: any) => {
    const timeStamp = new Date().getTime();
    const patch = { msg, id, time: timeStamp };

    store.updateChatDB(DBName, patch);
    records.value.push(patch);

    nextTick(() => {
      scrollToBottom();
    });
  });
};

const getChatRecords = async () => {
  const res = await store.getChatDB(DBName);

  records.value = (res as Array<any>) || [];

  nextTick(() => {
    scrollToBottom();
  });
};

const sumit = () => {
  if (!chat.value) {
    return false;
  }

  if (chat.value.includes("我愿意")) {
    showConfetti();
  }

  const timeStamp = new Date().getTime();

  socket.emit("chat", {
    id: socketId.value,
    msg: chat.value,
    time: timeStamp,
  });

  chat.value = "";
};

function scrollToBottom() {
  if (el.value && el.value.length > 0) {
    console.log(el.value);
    el.value[el.value?.length - 1]?.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}
</script>
