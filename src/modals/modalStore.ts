import { reactive } from 'vue'

interface ModalStore {
  active: string | null
  open(name: string): void
  close(): void
}

export const modalStore = reactive<ModalStore>({
  active: null,
  open(name: string) { this.active = name },
  close() { this.active = null }
})
