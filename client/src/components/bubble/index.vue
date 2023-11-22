<template>
  <div class="chat" :class="[id === socketId ? 'chat-end' : 'chat-start']" ref="el">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" :src="avatar" />
      </div>
    </div>
    <div class="chat-header">
      {{ id }}
      <time class="text-xs opacity-50">{{ dayjs(time).format("HH:mm") }}</time>
    </div>
    <div class="chat-bubble">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

defineProps({
  id: {
    type: String,
    required: true,
    default: ''
  },

  avatar: {
    type: String,
    default: ''
  },

  socketId: {
    type: String,
    required: true,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  time: {
    type: Number,
  }
})
</script>
