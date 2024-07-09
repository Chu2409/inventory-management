import { create } from 'zustand'
import { IProduct } from '../types'

interface ProductModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  fullProduct: IProduct | null
  setFullProduct: (fullProduct: IProduct | null) => void
}
export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  fullProduct: null,
  setFullProduct: (fullProduct) => set({ fullProduct }),
}))
