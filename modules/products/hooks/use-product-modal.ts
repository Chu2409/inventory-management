import { create } from 'zustand'

interface ProductModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  code: string | null
  setCode: (code: string | null) => void
  color: string | null
  setColor: (color: string | null) => void
}
export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  code: null,
  setCode: (code) => set({ code }),
  color: null,
  setColor: (color) => set({ color }),
}))
