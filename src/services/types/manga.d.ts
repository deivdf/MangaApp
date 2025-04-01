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
interface ChapterAttributes {
  volume: string | null;
  chapter: string;
  title: string | null;
  translatedLanguage: string;
  externalUrl: string | null;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

interface Relationship {
  id: string;
  type: string;
}

interface Chapter {
  id: string;
  type: string;
  attributes: ChapterAttributes;
  relationships: Relationship[];
}

interface ChapetersRespones {
  result: string;
  response: string;
  data: Chapter[];
  limit: number;
  offset: number;
  total: number;
}

interface MangaListResponse {
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}
type ChapterImageResponse = {
  _h: number;
  _i: number;
  _j: string[];
  _k: null;
};

export {
  Manga,
  MangaListResponse,
  Chapter,
  ChapetersRespones,
  ChapterImageResponse,
};
