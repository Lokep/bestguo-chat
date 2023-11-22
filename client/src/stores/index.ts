import { defineStore } from 'pinia'
import localforage from 'localforage'

export const useIndexedDBStore = defineStore('indexedDB', {
  state: () => ({
    chatDB: localforage.createInstance({
      name: 'chatDB',
    }),
    records: [] as any[]
  }),


  actions: {
    async initChatDB(key: string, value: any) {
      this.chatDB.setItem(key, value)
    },

    async updateChatDB(key:string, value: any) {
      const res  =  await this.chatDB.getItem(key)

      if (res) {
        this.chatDB.setItem(key, [...res as Array<any>, value])
      } else {
        this.chatDB.setItem(key, [value])
      }
    },

    getChatDB(key: string) {
      return this.chatDB.getItem(key)
    }
  }
})
