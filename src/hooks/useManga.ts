import {useQuery} from '@tanstack/react-query';
import client from '../services/api/client';
import {
  MangaListResponse,
  ChapetersRespones,
  ChapterImageResponse,
} from '../services/types/manga';

const fetchManga = async (offset: number): Promise<MangaListResponse> => {
  const {data} = await client.get('/manga', {
    params: {
      limit: 20,
      offset,
      includes: ['cover_art'],
    },
  });
  return data;
};

const fetchMangaSearch = async (title: string): Promise<MangaListResponse> => {
  const {data} = await client.get('/manga', {
    params: {
      limit: 10,
      title,
    },
  });
  return data;
};

const fetchMangaCaplist = async (id: string): Promise<ChapetersRespones> => {
  const {data} = await client.get(`/manga/${id}/feed`, {
    params: {
      'translatedLanguage[]': ['es', 'en'],
    },
  });
  return data;
};

const fetchChapeterImage = async (
  id: string,
): Promise<ChapterImageResponse> => {
  const {data} = await client.get(`/at-home/server/${id}`);
  const baseUrl = data.baseUrl;
  const chapeterHash = data.chapter.hash;
  return data.chapter.data.map(
    (page: string) => `${baseUrl}/data/${chapeterHash}/${page}`,
  );
};

export const useMangalist = (offset: number) => {
  return useQuery({
    queryKey: ['mangalist', offset],
    queryFn: () => fetchManga(offset),
    staleTime: 1000 * 60 * 5,
  });
};
export const useMangaCaplist = (id: string) => {
  return useQuery({
    queryKey: ['mangaCaplist', id],
    queryFn: () => fetchMangaCaplist(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useChapeterImage = (id: string) => {
  console.log('apirespuesta', fetchChapeterImage(id));
  return useQuery({
    queryKey: ['chapeterImage', id],
    queryFn: () => fetchChapeterImage(id),
    staleTime: 1000 * 60 * 5,
  });
};
export const useMangaSearch = (title: string) => {
  return useQuery({
    queryKey: ['mangaSearch', title],
    queryFn: () => fetchMangaSearch(title),
    staleTime: 1000 * 60 * 5,
  });
};
