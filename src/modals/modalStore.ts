import { reactive } from 'vue'

// 1. Definiera ett interface för din store
interface ModalStore {
  active: string | null;
  open(name: string): void;
  close(): void;
}

// 2. Applicera interfacet på ditt reactive-objekt
export const modalStore = reactive<ModalStore>({
  active: null,

  open(name: string) {
    this.active = name
  },

  close() {
    this.active = null
  }
})