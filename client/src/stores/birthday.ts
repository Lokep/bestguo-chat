import { defineStore } from 'pinia'


export const useBirthDayStore = defineStore('birthday',{
  state: () => ({
    visible: false,
    isTyped: false
  }),

  actions: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },

    toggle() {
      this.visible = !this.visible
    }
  }
})
