import { Category } from '@prisma/client'
import { create } from 'zustand'

interface CategoriesState {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export const useCategories = create<CategoriesState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}))
