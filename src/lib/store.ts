import { create } from 'zustand';

type LoaderStore = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useLoaderStore = create<LoaderStore>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set(() => ({ loading: value })),
}));
