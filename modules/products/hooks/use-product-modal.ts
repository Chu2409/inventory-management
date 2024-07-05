import { create } from 'zustand'
import { IFullProduct } from '../types'

interface ProductModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  fullProduct: IFullProduct | null
  setFullProduct: (fullProduct: IFullProduct | null) => void
}
export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  fullProduct: null,
  setFullProduct: (fullProduct) => set({ fullProduct }),
}))
