import { create } from 'zustand';

interface BurgerState {
  isOpen: boolean;
}

interface BurgerActions {
  closeBurger: () => void;
  openBurger: () => void;
}

export const useBurgerStore = create<BurgerState & BurgerActions>(set => ({
  isOpen: false,
  closeBurger: () => set({ isOpen: false }),
  openBurger: () => set({ isOpen: true }),
}));
