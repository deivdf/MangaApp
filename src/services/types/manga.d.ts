interface Manga {
  id: string;
  type: 'manga';
  attributes: {
    title: {
      en: string;
      es?: string;
    };
    description: {
      en: string;
      es?: string;
    };
    lastChapter?: string;
    tags: Array<{
      attributes: {
        name: {
          en: string;
          es?: string;
        };
      };
    }>;
  };
  relationships: Array<{
    id: string;
    type: 'cover_art' | 'author';
    attributes?: {
      fileName?: string;
    };
  }>;
}
interface MangaListResponse {
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}

export {Manga, MangaListResponse};
