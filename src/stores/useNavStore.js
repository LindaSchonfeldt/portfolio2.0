import { create } from 'zustand'

export const useNavStore = create((set) => ({
  expandedItem: null,
  toggleExpanded: (itemName) =>
    set((state) => ({
      expandedItem: state.expandedItem === itemName ? null : itemName
    })),
  closeAll: () => set({ expandedItem: null })
}))
