import {create} from 'zustand';

interface MangaState {
  Mangamarks: string[];
  addMangamark: (mangaId: string) => void;
  removeMangamark: (mangaId: string) => void;
}

export const useMangaStore = create<MangaState>(set => ({
  Mangamarks: [],
  addMangamark: mangaId =>
    set(state => ({Mangamarks: [...state.Mangamarks, mangaId]})),
  removeMangamark: mangaId =>
    set(state => ({Mangamarks: state.Mangamarks.filter(id => id !== mangaId)})),
}));
