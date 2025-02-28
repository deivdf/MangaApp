interface Manga {
  id: string;
  type: 'manga';
  attributes: {
    title: {
      en: string;
    };
    description: {
      en: string;
    };
    lastChapter?: string;
    tags: Array<{
      atributes: {
        name: {
          en: string;
        };
      };
    }>;
  };
  relationships: Array<{
    id: string;
    type: 'cover_art' | 'author';
  }>;
}
interface MangaListResponse {
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}

export {Manga, MangaListResponse};
