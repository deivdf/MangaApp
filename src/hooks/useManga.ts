import {useQuery} from '@tanstack/react-query';
import client from '../services/api/client';
import {MangaListResponse} from '../services/types/manga';

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

export const useMangalist = (offset: number) => {
  return useQuery({
    queryKey: ['mangalist', offset],
    queryFn: () => fetchManga(offset),
    staleTime: 1000 * 60 * 5,
  });
};
