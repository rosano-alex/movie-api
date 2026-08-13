export interface Movie {
  id: string;
  imdbId: string;
  railId: string;
  title: string;
  year: number;
  runtimeMinutes: number;
  certificate: string;
  posterUrl: string;
  previewUrl: string;
  description: string;
}

export interface MovieRail {
  id: string;
  title: string;
  movies: Movie[];
}

export interface MovieCatalog {
  rails: MovieRail[];
}
