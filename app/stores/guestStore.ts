import { create } from 'zustand';

export type MenuCategory = 'bebida' | 'snack' | 'postre';

interface GuestStore {
  // Guest name
  guestName: string | null;
  setGuestName: (name: string) => void;

  // Menu selections
  selectedBebida: string | null;
  selectedSnack: string | null;
  selectedPostre: string | null;
  selectItem: (category: MenuCategory, item: string) => void;

  // Modal visibility
  showNameModal: boolean;
  setShowNameModal: (show: boolean) => void;

  // Computed: can confirm?
  canConfirm: () => boolean;
}

const SESSION_KEY = 'senda_guest_name';

const getStoredName = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(SESSION_KEY);
};

export const useGuestStore = create<GuestStore>((set, get) => ({
  guestName: getStoredName(),
  showNameModal: !getStoredName(), // show modal if no name yet

  selectedBebida: null,
  selectedSnack: null,
  selectedPostre: null,

  setGuestName: (name: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, name);
    }
    set({ guestName: name, showNameModal: false });
  },

  selectItem: (category, item) => {
    if (category === 'bebida') set({ selectedBebida: item });
    if (category === 'snack')  set({ selectedSnack: item });
    if (category === 'postre') set({ selectedPostre: item });
  },

  setShowNameModal: (show) => set({ showNameModal: show }),

  canConfirm: () => {
    const { guestName, selectedBebida, selectedSnack, selectedPostre } = get();
    return !!(guestName && selectedBebida && selectedSnack && selectedPostre);
  },
}));
