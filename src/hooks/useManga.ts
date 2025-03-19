import {useQuery} from '@tanstack/react-query';
import client from '../services/api/client';
import {MangaListResponse, ChapetersRespones} from '../services/types/manga';

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

const fetchMangaCaplist = async (id: string): Promise<ChapetersRespones> => {
  const {data} = await client.get(`/manga/${id}/feed`);
  return data;
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
